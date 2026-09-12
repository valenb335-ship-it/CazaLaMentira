import { TriviaRound, Fact, Category } from '../types/game';
import { CURATED_ROUNDS, INFINITE_POOL, getRankForLevel } from '../data/triviaData';

const SEEN_FACTS_STORAGE_KEY = 'trivia_caza_mentira_seen_facts';

// Función para barajar un array sin mutarlo (Fisher-Yates)
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Obtener el conjunto de IDs de datos ya vistos por el usuario
export function getSeenFactIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(SEEN_FACTS_STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

// Registrar hechos como vistos en localStorage
export function markFactsAsSeen(factIds: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    const seen = getSeenFactIds();
    factIds.forEach((id) => seen.add(id));
    localStorage.setItem(SEEN_FACTS_STORAGE_KEY, JSON.stringify(Array.from(seen)));
  } catch {
    // Si falla el almacenamiento local, no bloquea el juego
  }
}

// Reiniciar historial de vistos
export function resetSeenFacts(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SEEN_FACTS_STORAGE_KEY);
  } catch {
    // Silencioso
  }
}

// Obtener todos los hechos reales del catálogo completo
function getAllTrueFacts(): Fact[] {
  const map = new Map<string, Fact>();
  INFINITE_POOL.trueFacts.forEach((f) => map.set(f.id, { ...f, isLie: false as const }));
  CURATED_ROUNDS.forEach((r) => {
    r.facts.filter((f) => !f.isLie).forEach((f) => map.set(f.id, f));
  });
  return Array.from(map.values());
}

// Obtener todas las mentiras del catálogo completo
function getAllLies(): Fact[] {
  const map = new Map<string, Fact>();
  INFINITE_POOL.convincingLies.forEach((f) => map.set(f.id, { ...f, isLie: true as const }));
  CURATED_ROUNDS.forEach((r) => {
    r.facts.filter((f) => f.isLie).forEach((f) => map.set(f.id, f));
  });
  return Array.from(map.values());
}

// Genera una ronda para cualquier nivel garantizando que NO se repitan hechos vistos
export function generateRoundForLevel(level: number, selectedCategory?: Category | 'mix'): TriviaRound {
  const seenIds = getSeenFactIds();

  const allTrue = getAllTrueFacts();
  const allLies = getAllLies();

  // Filtrar descartando los hechos ya vistos por este usuario
  let availableTrue = allTrue.filter((f) => !seenIds.has(f.id));
  let availableLies = allLies.filter((f) => !seenIds.has(f.id));

  // Si el usuario ya vio casi todos los datos disponibles, reiniciar el ciclo transparentemente
  if (availableTrue.length < 2 || availableLies.length < 1) {
    resetSeenFacts();
    availableTrue = allTrue;
    availableLies = allLies;
  }

  // Filtrar por dificultad progresiva según el nivel actual
  // A mayor nivel, mentiras más sutiles y convincentes (dificultad 4 o 5)
  const targetDifficulty = level <= 4 ? 1 : level <= 8 ? 2 : level <= 14 ? 3 : level <= 20 ? 4 : 5;

  const sortedLies = [...availableLies].sort((a, b) => {
    const diffA = Math.abs(a.difficulty - targetDifficulty);
    const diffB = Math.abs(b.difficulty - targetDifficulty);
    return diffA - diffB;
  });

  // Elegir 1 mentira convincente y 2 verdades
  const selectedLie = shuffleArray(sortedLies.slice(0, 5))[0] || availableLies[0];
  const shuffledTrue = shuffleArray(availableTrue);
  const selectedTrue = shuffledTrue.slice(0, 2);

  // Registrar estos 3 hechos como vistos para que jamás vuelvan a aparecer a este usuario
  markFactsAsSeen([selectedLie.id, selectedTrue[0].id, selectedTrue[1].id]);

  // Barajar las 3 opciones de la ronda
  const roundFacts = shuffleArray([...selectedTrue, selectedLie]);

  return {
    id: `round-${level}-${Date.now()}`,
    level,
    category: selectedCategory || 'mix',
    themeTitle: `Nivel ${level}`,
    facts: roundFacts,
  };
}

// Cálculo de puntuación con multiplicadores dinámicos de racha
export function calculateRoundScore(level: number, streak: number, timeSpentSeconds: number): { points: number; bonus: number; multiplier: number } {
  const basePoints = 100;
  const levelBonus = Math.min(level * 10, 500);

  // Multiplicador de racha
  let multiplier = 1.0;
  if (streak >= 10) multiplier = 3.0;
  else if (streak >= 7) multiplier = 2.5;
  else if (streak >= 4) multiplier = 2.0;
  else if (streak >= 2) multiplier = 1.5;

  // Bonus de velocidad si responde en menos de 8 segundos
  let speedBonus = 0;
  if (timeSpentSeconds <= 5) {
    speedBonus = 50;
  } else if (timeSpentSeconds <= 10) {
    speedBonus = 25;
  }

  const rawPoints = (basePoints + levelBonus + speedBonus) * multiplier;
  const totalPoints = Math.round(rawPoints);

  return {
    points: totalPoints,
    bonus: Math.round(speedBonus * multiplier),
    multiplier,
  };
}

export { getRankForLevel };
