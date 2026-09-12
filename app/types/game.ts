export type Category = 'historia' | 'geografia' | 'musica' | 'cine';

export interface Fact {
  id: string;
  text: string;
  isLie: boolean;
  explanation: string;
  category: Category;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1: Fácil, 2: Medio, 3: Difícil, 4: Experto, 5: Mente Maestra
}

export interface TriviaRound {
  id: string;
  level: number;
  category: Category | 'mix';
  facts: Fact[];
  themeTitle: string;
}

export type GameMode = 'challenge' | 'zen';

export interface GameState {
  currentLevel: number;
  score: number;
  streak: number;
  maxStreak: number;
  lives: number;
  selectedFactId: string | null;
  hasAnswered: boolean;
  isCorrect: boolean | null;
  currentRound: TriviaRound;
  mode: GameMode;
  showExplanation: boolean;
  showLeaderboard: boolean;
  isGameOver: boolean;
  soundEnabled: boolean;
  answeredCount: number;
  correctCount: number;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  level: number;
  rankTitle: string;
  date: string;
  isCurrentPlayer?: boolean;
}

export interface RankInfo {
  title: string;
  minLevel: number;
  badge: string;
  description: string;
}
