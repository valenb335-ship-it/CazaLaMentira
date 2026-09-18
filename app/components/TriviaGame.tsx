'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TriviaRound, StudyMaterial } from '../types/game';
import { generateRoundForLevel, calculateRoundScore, getRankForLevel, setRemoteFacts } from '../utils/infiniteEngine';
import {
  playCorrectSound,
  playWrongSound,
  playClickSound,
  playStreakSound,
  playGameOverSound,
} from '../utils/soundEffects';
import { saveScoreToLeaderboard } from '../utils/leaderboard';
import {
  isSupabaseConfigured,
  seedFactsToSupabaseIfEmpty,
  fetchFactsFromSupabase,
  recordRoundAnswerToSupabase,
} from '../lib/supabase';
import { Header } from './Header';
import { FactCard } from './FactCard';
import { LeaderboardModal } from './LeaderboardModal';
import { GameOverModal } from './GameOverModal';
import { StudyUploadModal } from './StudyUploadModal';

function getTimestamp(): number {
  return Date.now();
}

export const TriviaGame: React.FC = () => {
  // Estado del juego
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Estado del Modo Estudio
  const [isStudyMode, setIsStudyMode] = useState<boolean>(false);
  const [studyMaterial, setStudyMaterial] = useState<StudyMaterial | null>(null);
  const [studyRoundIndex, setStudyRoundIndex] = useState<number>(0);
  const [isStudyModalOpen, setIsStudyModalOpen] = useState<boolean>(false);

  // Estado de la ronda actual (sin repetir datos gracias al motor en infiniteEngine)
  const [currentRound, setCurrentRound] = useState<TriviaRound>(() => generateRoundForLevel(1, 'mix'));
  const [selectedFactId, setSelectedFactId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const roundStartTimeRef = useRef<number>(0);

  // Métricas
  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [totalCorrect, setTotalCorrect] = useState<number>(0);

  // Modales
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [playerRankPosition, setPlayerRankPosition] = useState<number | null>(null);

  // Registrar timestamp inicial y sincronizar con Supabase
  useEffect(() => {
    roundStartTimeRef.current = getTimestamp();

    if (isSupabaseConfigured) {
      seedFactsToSupabaseIfEmpty().then(() => {
        fetchFactsFromSupabase().then((facts) => {
          if (facts && facts.length > 0) {
            setRemoteFacts(facts);
          }
        });
      });
    }
  }, []);

  // Iniciar Modo Estudio con apuntes cargados
  const handleStartStudy = (material: StudyMaterial) => {
    playClickSound(soundEnabled);
    setIsStudyMode(true);
    setStudyMaterial(material);
    setStudyRoundIndex(0);
    setLevel(1);
    setCurrentRound(material.rounds[0]);
    setSelectedFactId(null);
    setHasAnswered(false);
    setIsCorrect(null);
    roundStartTimeRef.current = getTimestamp();
  };

  // Salir de Modo Estudio y volver a Trivia General
  const handleExitStudyMode = () => {
    playClickSound(soundEnabled);
    setIsStudyMode(false);
    setStudyMaterial(null);
    setStudyRoundIndex(0);
    setLevel(1);
    const regularRound = generateRoundForLevel(1, 'mix');
    setCurrentRound(regularRound);
    setSelectedFactId(null);
    setHasAnswered(false);
    setIsCorrect(null);
    roundStartTimeRef.current = getTimestamp();
  };

  // Selección de una columna (identificar la mentira)
  const handleSelectFact = (factId: string) => {
    if (hasAnswered || isGameOver) return;

    const timeSpentSeconds =
      roundStartTimeRef.current > 0 ? (getTimestamp() - roundStartTimeRef.current) / 1000 : 5;
    const chosenFact = currentRound.facts.find((f) => f.id === factId);
    if (!chosenFact) return;

    setSelectedFactId(factId);
    setHasAnswered(true);
    setTotalAnswered((prev) => prev + 1);

    // En este juego, la opción correcta a elegir es la MENTIRA
    const answeredCorrectly = chosenFact.isLie;
    setIsCorrect(answeredCorrectly);

    let pointsAwarded = 0;
    let multiplier = 1;

    if (answeredCorrectly) {
      // ¡Acierto! El usuario detectó la mentira
      playCorrectSound(soundEnabled);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }
      if (newStreak >= 3 && newStreak % 3 === 0) {
        setTimeout(() => playStreakSound(soundEnabled), 400);
      }

      setTotalCorrect((prev) => prev + 1);

      const scoreCalculation = calculateRoundScore(level, newStreak, timeSpentSeconds);
      pointsAwarded = scoreCalculation.points;
      multiplier = scoreCalculation.multiplier;
      setScore((prev) => prev + scoreCalculation.points);
    } else {
      // Fallo: el usuario eligió un dato que era verdad
      playWrongSound(soundEnabled);
      setStreak(0);

      const nextLives = lives - 1;
      setLives(nextLives);
      if (nextLives <= 0) {
        // Fin de partida
        setTimeout(() => {
          playGameOverSound(soundEnabled);
          const currentAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
          const { playerRank } = saveScoreToLeaderboard(score, level, maxStreak, currentAccuracy);
          setPlayerRankPosition(playerRank);
          setIsGameOver(true);
        }, 800);
      }
    }

    // Registrar la respuesta en la base de datos de Supabase si está activa
    if (isSupabaseConfigured) {
      recordRoundAnswerToSupabase({
        level,
        selectedFactText: chosenFact.text,
        isCorrect: answeredCorrectly,
        pointsAwarded,
        streakMultiplier: multiplier,
        responseTimeSeconds: Math.round(timeSpentSeconds * 10) / 10,
      });
    }
  };

  // Pasar a la siguiente ronda
  const handleNextRound = () => {
    playClickSound(soundEnabled);

    if (isGameOver) {
      return;
    }

    // Si estamos en Modo Estudio, avanzamos a la siguiente ronda del material
    if (isStudyMode && studyMaterial) {
      const nextIdx = studyRoundIndex + 1;
      if (nextIdx < studyMaterial.rounds.length) {
        setStudyRoundIndex(nextIdx);
        setLevel(nextIdx + 1);
        setCurrentRound(studyMaterial.rounds[nextIdx]);
      } else {
        // Se completó el temario: volver a barajar para repasar de nuevo
        setStudyRoundIndex(0);
        setLevel(1);
        setCurrentRound(studyMaterial.rounds[0]);
      }
    } else {
      // Trivia General: datos nuevos nunca repetidos
      const nextLevel = isCorrect ? level + 1 : level;
      setLevel(nextLevel);
      const nextRound = generateRoundForLevel(nextLevel, 'mix');
      setCurrentRound(nextRound);
    }

    setSelectedFactId(null);
    setHasAnswered(false);
    setIsCorrect(null);
    roundStartTimeRef.current = getTimestamp();
  };

  // Reiniciar partida desde nivel 1
  const handleRestart = () => {
    playClickSound(soundEnabled);
    setLevel(1);
    setScore(0);
    setStreak(0);
    setLives(3);
    setSelectedFactId(null);
    setHasAnswered(false);
    setIsCorrect(null);
    setIsGameOver(false);
    setPlayerRankPosition(null);
    setTotalAnswered(0);
    setTotalCorrect(0);

    if (isStudyMode && studyMaterial) {
      setStudyRoundIndex(0);
      setCurrentRound(studyMaterial.rounds[0]);
    } else {
      const newRound = generateRoundForLevel(1, 'mix');
      setCurrentRound(newRound);
    }

    roundStartTimeRef.current = getTimestamp();
  };

  const currentRank = getRankForLevel(level);

  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 flex flex-col select-none">
      {/* Barra superior minimalista */}
      <Header
        level={level}
        score={score}
        streak={streak}
        lives={lives}
        soundEnabled={soundEnabled}
        isStudyMode={isStudyMode}
        studyTitle={studyMaterial?.title}
        totalStudyRounds={studyMaterial?.rounds.length}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenLeaderboard={() => setShowLeaderboard(true)}
        onOpenStudyModal={() => setIsStudyModalOpen(true)}
        onExitStudyMode={handleExitStudyMode}
      />

      {/* Contenedor de las 3 columnas a pantalla completa */}
      <main className="flex-1 w-full h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden relative divide-y md:divide-y-0 md:divide-x divide-zinc-900">
        {currentRound.facts.map((fact, index) => (
          <FactCard
            key={fact.id || index}
            fact={fact}
            index={index}
            hasAnswered={hasAnswered}
            isSelected={selectedFactId === fact.id}
            onSelect={handleSelectFact}
          />
        ))}

        {/* Botón flotante para avanzar al siguiente dato */}
        {hasAnswered && (
          <div className="fixed md:absolute bottom-6 left-1/2 -translate-x-1/2 z-30 animate-pop-success">
            <button
              onClick={handleNextRound}
              className={`px-8 py-3.5 rounded-full font-black text-sm tracking-wide transition-all transform hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-2 cursor-pointer ${
                isCorrect
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-emerald-500/30'
                  : 'bg-zinc-100 hover:bg-white text-zinc-950 shadow-white/20'
              }`}
            >
              <span>{isGameOver ? 'Ver Resumen' : 'Siguiente'}</span>
              <span>→</span>
            </button>
          </div>
        )}
      </main>

      {/* Modal de Modo Estudio */}
      <StudyUploadModal
        isOpen={isStudyModalOpen}
        onClose={() => setIsStudyModalOpen(false)}
        onStartStudy={handleStartStudy}
      />

      {/* Modales */}
      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
      />

      <GameOverModal
        isOpen={isGameOver}
        score={score}
        level={level}
        maxStreak={maxStreak}
        totalAnswered={totalAnswered}
        totalCorrect={totalCorrect}
        rank={currentRank}
        playerRankPosition={playerRankPosition}
        onRestart={handleRestart}
        onOpenLeaderboard={() => {
          setShowLeaderboard(true);
        }}
      />
    </div>
  );
};
