import { LeaderboardEntry } from '../types/game';
import { getRankForLevel } from '../data/triviaData';
import { isSupabaseConfigured, fetchLeaderboardFromSupabase, saveGameSessionToSupabase } from '../lib/supabase';

const STORAGE_KEY = 'trivia_caza_mentira_leaderboard';
const PLAYER_NAME_KEY = 'trivia_caza_mentira_player_name';

export function getStoredPlayerName(): string {
  if (typeof window === 'undefined') return 'Tú';
  return localStorage.getItem(PLAYER_NAME_KEY) || 'Tú';
}

export function savePlayerName(name: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PLAYER_NAME_KEY, name.trim() || 'Tú');
}

// Obtener ranking local: SOLO usuarios reales que hayan jugado
export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed: LeaderboardEntry[] = JSON.parse(stored);
    // Filtrar y purgar cualquier usuario ficticio o rival de prueba
    const realOnly = parsed.filter(
      (e) => !e.id.startsWith('rival-') && !e.playerName.toLowerCase().includes('rival')
    );
    // Si había datos ficticios antiguos guardados, actualizar el storage
    if (realOnly.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(realOnly));
    }
    return realOnly;
  } catch {
    return [];
  }
}

// Carga el ranking priorizando usuarios reales de Supabase
export async function getLeaderboardWithRemote(): Promise<LeaderboardEntry[]> {
  if (isSupabaseConfigured) {
    const remote = await fetchLeaderboardFromSupabase();
    if (remote !== null) {
      return remote;
    }
  }
  return getLeaderboard();
}

export function saveScoreToLeaderboard(
  score: number,
  level: number,
  maxStreak = 0,
  accuracy = 100
): { entries: LeaderboardEntry[]; playerRank: number } {
  const playerName = getStoredPlayerName();

  // 1. Guardar en Supabase si está configurado
  if (isSupabaseConfigured) {
    saveGameSessionToSupabase({
      playerName,
      score,
      level,
      maxStreak,
      accuracy,
      mode: 'challenge',
    }).catch((err) => console.error('Error guardando en Supabase:', err));
  }

  // 2. Guardar en almacenamiento local para respuesta instantánea
  if (typeof window === 'undefined') {
    return { entries: [], playerRank: 1 };
  }

  // Filtrar partidas previas del jugador para actualizar con su mejor puntuación
  const existingEntries = getLeaderboard();
  const otherPlayers = existingEntries.filter(
    (e) => e.playerName !== `${playerName} (Tú)` && e.playerName !== playerName
  );
  const previousPlayerEntry = existingEntries.find(
    (e) => e.playerName === `${playerName} (Tú)` || e.playerName === playerName
  );

  const bestScore = Math.max(previousPlayerEntry?.score || 0, score);
  const bestLevel = Math.max(previousPlayerEntry?.level || 1, level);
  const rankInfo = getRankForLevel(bestLevel);

  const playerEntry: LeaderboardEntry = {
    id: `player-${Date.now()}`,
    playerName: `${playerName} (Tú)`,
    score: bestScore,
    level: bestLevel,
    rankTitle: rankInfo.title,
    date: '¡Hoy!',
    isCurrentPlayer: true,
  };

  const combined = [...otherPlayers, playerEntry].sort((a, b) => b.score - a.score);
  const topEntries = combined.slice(0, 20);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topEntries));

  const playerRank = topEntries.findIndex((e) => e.isCurrentPlayer) + 1;

  return {
    entries: topEntries,
    playerRank: playerRank > 0 ? playerRank : topEntries.length + 1,
  };
}
