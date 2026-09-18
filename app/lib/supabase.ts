import { createClient } from '@supabase/supabase-js';
import { LeaderboardEntry, Fact } from '../types/game';
import { CURATED_ROUNDS, INFINITE_POOL } from '../data/triviaData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://tu-proyecto.supabase.co' &&
  !supabaseUrl.includes('tu-proyecto')
);

// Cliente de Supabase (o cliente nulo si aún no se configuran las variables de entorno)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// ==========================================================
// 1. SERVICIO DE RANKING / SALÓN DE LA FAMA
// ==========================================================

export async function fetchLeaderboardFromSupabase(): Promise<LeaderboardEntry[] | null> {
  if (!supabase) return null;

  try {
    // 1. Consultar jugadores reales de la tabla players con su mejor puntuación
    const { data: playersData, error: playersError } = await supabase
      .from('players')
      .select('id, username, highest_score, highest_level, max_streak, updated_at')
      .gt('highest_score', 0)
      .order('highest_score', { ascending: false })
      .limit(20);

    if (!playersError && playersData && playersData.length > 0) {
      return playersData.map((row) => ({
        id: row.id,
        playerName: row.username || 'Cazador',
        score: row.highest_score || 0,
        level: row.highest_level || 1,
        rankTitle: `Nivel ${row.highest_level || 1}`,
        date: row.updated_at ? new Date(row.updated_at).toLocaleDateString() : 'Reciente',
      }));
    }

    // 2. Si players no tiene registros, consultar partidas reales en game_sessions con puntuación > 0
    const { data: sessionData, error: sessionError } = await supabase
      .from('game_sessions')
      .select('id, final_score, final_level, max_streak, ended_at, players(username)')
      .gt('final_score', 0)
      .order('final_score', { ascending: false })
      .limit(20);

    if (!sessionError && sessionData && sessionData.length > 0) {
      return sessionData.map((row, index) => {
        const p = Array.isArray(row.players) ? row.players[0] : row.players;
        return {
          id: row.id || `entry-${index}`,
          playerName: (p as { username?: string })?.username || 'Cazador',
          score: row.final_score || 0,
          level: row.final_level || 1,
          rankTitle: `Nivel ${row.final_level || 1}`,
          date: row.ended_at ? new Date(row.ended_at).toLocaleDateString() : 'Hoy',
        };
      });
    }

    // Si aún no hay partidas reales registradas en la base de datos
    return [];
  } catch (err) {
    console.error('Error al obtener ranking de Supabase:', err);
    return null;
  }
}

export async function saveGameSessionToSupabase(params: {
  playerName: string;
  score: number;
  level: number;
  maxStreak: number;
  accuracy: number;
  mode: 'challenge' | 'zen';
}): Promise<string | null> {
  if (!supabase) return null;

  try {
    // 1. Buscar o crear el jugador en la tabla players
    let playerId: string | null = null;
    const cleanName = params.playerName.trim() || 'Jugador';

    const { data: existingPlayer } = await supabase
      .from('players')
      .select('id, highest_score, highest_level, max_streak, total_games_played, total_correct_answers')
      .eq('username', cleanName)
      .maybeSingle();

    if (existingPlayer) {
      playerId = existingPlayer.id;
      await supabase
        .from('players')
        .update({
          highest_score: Math.max(existingPlayer.highest_score || 0, params.score),
          highest_level: Math.max(existingPlayer.highest_level || 0, params.level),
          max_streak: Math.max(existingPlayer.max_streak || 0, params.maxStreak),
          total_games_played: (existingPlayer.total_games_played || 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', playerId);
    } else {
      const { data: newPlayer } = await supabase
        .from('players')
        .insert({
          username: cleanName,
          highest_score: params.score,
          highest_level: params.level,
          max_streak: params.maxStreak,
          total_games_played: 1,
        })
        .select('id')
        .single();

      if (newPlayer) {
        playerId = newPlayer.id;
      }
    }

    // 2. Registrar la sesión de juego en game_sessions
    const { data: session } = await supabase
      .from('game_sessions')
      .insert({
        player_id: playerId,
        game_mode: params.mode,
        final_score: params.score,
        final_level: params.level,
        max_streak: params.maxStreak,
        accuracy_percentage: params.accuracy,
        ended_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    return session?.id || null;
  } catch (err) {
    console.error('Error al guardar partida en Supabase:', err);
    return null;
  }
}

// ==========================================================
// 2. REGISTRO DE RESPUESTAS INDIVIDUALES POR RONDA
// ==========================================================

export async function recordRoundAnswerToSupabase(params: {
  sessionId?: string | null;
  level: number;
  selectedFactText: string;
  isCorrect: boolean;
  pointsAwarded: number;
  streakMultiplier: number;
  responseTimeSeconds: number;
}): Promise<void> {
  if (!supabase) return;

  try {
    // Si tenemos id de sesión y el ID del fact existe en DB, guardamos el detalle
    if (params.sessionId) {
      await supabase.from('round_answers').insert({
        session_id: params.sessionId,
        level: params.level,
        is_correct: params.isCorrect,
        points_awarded: params.pointsAwarded,
        streak_multiplier: params.streakMultiplier,
        response_time_seconds: params.responseTimeSeconds,
      });
    }
  } catch {
    // Silencioso para no degradar la experiencia de juego
  }
}

// ==========================================================
// 3. SERVICIO DE DATOS CURIOSOS (FACTS)
// ==========================================================

export async function fetchFactsFromSupabase(): Promise<Fact[] | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('facts')
      .select('id, statement, is_lie, explanation, category_id, difficulty_level')
      .eq('is_active', true);

    if (error || !data || data.length === 0) {
      return null;
    }

    return data.map((row) => ({
      id: row.id,
      text: row.statement,
      isLie: Boolean(row.is_lie),
      explanation: row.explanation,
      category: row.category_id,
      difficulty: row.difficulty_level as 1 | 2 | 3 | 4 | 5,
    }));
  } catch (err) {
    console.error('Error al obtener datos curiosos de Supabase:', err);
    return null;
  }
}

// Sincronizar / cargar los datos iniciales en Supabase si la tabla está vacía
export async function seedFactsToSupabaseIfEmpty(): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { count, error } = await supabase
      .from('facts')
      .select('*', { count: 'exact', head: true });

    if (error || (count && count > 0)) {
      return false; // Ya tiene datos cargados
    }

    // Extraer todos los datos locales
    const allLocalFacts: Fact[] = [
      ...CURATED_ROUNDS.flatMap((r) => r.facts),
      ...INFINITE_POOL.trueFacts.map((f) => ({ ...f, isLie: false as const })),
      ...INFINITE_POOL.convincingLies.map((f) => ({ ...f, isLie: true as const })),
    ];

    const uniqueMap = new Map<string, Fact>();
    allLocalFacts.forEach((f) => uniqueMap.set(f.text, f));
    const uniqueFacts = Array.from(uniqueMap.values());

    const rowsToInsert = uniqueFacts.map((f) => ({
      category_id: f.category,
      statement: f.text,
      is_lie: f.isLie,
      explanation: f.explanation,
      difficulty_level: f.difficulty || 1,
      is_active: true,
    }));

    const { error: insertError } = await supabase.from('facts').insert(rowsToInsert);
    if (insertError) {
      console.error('Error al poblar datos iniciales en Supabase:', insertError);
      return false;
    }

    console.log(`Se insertaron ${rowsToInsert.length} datos curiosos en Supabase automáticamente.`);
    return true;
  } catch (err) {
    console.error('Error al sincronizar datos con Supabase:', err);
    return false;
  }
}
