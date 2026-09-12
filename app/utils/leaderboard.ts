import { LeaderboardEntry } from '../types/game';
import { getRankForLevel } from '../data/triviaData';
import { isSupabaseConfigured, fetchLeaderboardFromSupabase, saveGameSessionToSupabase } from '../lib/supabase';

const STORAGE_KEY = 'trivia_caza_mentira_leaderboard';
const PLAYER_NAME_KEY = 'trivia_caza_mentira_player_name';

const INITIAL_RIVALS: LeaderboardEntry[] = [
  { id: 'rival-1', playerName: 'Elena M.', score: 4850, level: 28, rankTitle: 'Oráculo de la Verdad', date: 'Ayer' },
  { id: 'rival-2', playerName: 'Lucas Cazador', score: 3620, level: 21, rankTitle: 'Sabio Escéptico', date: 'Hace 2 días' },
  { id: 'rival-3', playerName: 'Sofi Trivia', score: 2750, level: 16, rankTitle: 'Sabio Escéptico', date: 'Hace 3 días' },
  { id: 'rival-4', playerName: 'Mateo R.', score: 1980, level: 12, rankTitle: 'Cazador de Fake News', date: 'Esta semana' },
  { id: 'rival-5', playerName: 'Valen Explorer', score: 1450, level: 9, rankTitle: 'Detective de Mitos', date: 'Esta semana' },
  { id: 'rival-6', playerName: 'Nico Data', score: 980, level: 6, rankTitle: 'Detective de Mitos', date: 'Esta semana' },
  { id: 'rival-7', playerName: 'Camila Curiosa', score: 520, level: 4, rankTitle: 'Novato Curioso', date: 'Esta semana' },
];

export function getStoredPlayerName(): string {
  if (typeof window === 'undefined') return 'Tú';
  return localStorage.getItem(PLAYER_NAME_KEY) || 'Tú';
}

export function savePlayerName(name: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PLAYER_NAME_KEY, name.trim() || 'Tú');
}

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return INITIAL_RIVALS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_RIVALS));
    return INITIAL_RIVALS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_RIVALS;
  }
}

// Carga el ranking priorizando Supabase si está disponible
export async function getLeaderboardWithRemote(): Promise<LeaderboardEntry[]> {
  if (isSupabaseConfigured) {
    const remote = await fetchLeaderboardFromSupabase();
    if (remote && remote.length > 0) {
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

  // 1. Guardar en Supabase en segundo plano si está configurado
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
    return { entries: INITIAL_RIVALS, playerRank: 1 };
  }

  const currentEntries = getLeaderboard().filter((e) => !e.isCurrentPlayer);
  const rankInfo = getRankForLevel(level);

  const playerEntry: LeaderboardEntry = {
    id: `player-${Date.now()}`,
    playerName: `${playerName} (Tú)`,
    score,
    level,
    rankTitle: rankInfo.title,
    date: '¡Hoy!',
    isCurrentPlayer: true,
  };

  const combined = [...currentEntries, playerEntry].sort((a, b) => b.score - a.score);
  const topEntries = combined.slice(0, 15);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topEntries));

  const playerRank = topEntries.findIndex((e) => e.isCurrentPlayer) + 1;

  return {
    entries: topEntries,
    playerRank: playerRank > 0 ? playerRank : topEntries.length + 1,
  };
}
