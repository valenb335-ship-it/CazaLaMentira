import React from 'react';
import { RankInfo } from '../types/game';
import { TrophyIcon, FireIcon } from './Icons';

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  level: number;
  maxStreak: number;
  totalAnswered: number;
  totalCorrect: number;
  rank: RankInfo;
  playerRankPosition: number | null;
  onRestart: () => void;
  onOpenLeaderboard: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  score,
  level,
  maxStreak,
  totalAnswered,
  totalCorrect,
  rank,
  playerRankPosition,
  onRestart,
  onOpenLeaderboard,
}) => {
  if (!isOpen) return null;

  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-pop-success">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
        {/* Ícono de fin de partida */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-3xl shadow-inner">
          {rank.badge}
        </div>

        <h2 className="text-2xl font-black text-zinc-100 uppercase tracking-tight">
          ¡Fin de la Partida!
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Te has quedado sin vidas, pero tu conocimiento fue notable.
        </p>

        {/* Tarjeta de Rango Obtenido */}
        <div className="my-5 p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Rango Alcanzado
          </span>
          <div className="text-lg font-black text-zinc-100 mt-0.5">
            {rank.title}
          </div>
          <p className="text-xs text-zinc-400 mt-1 italic">
            &ldquo;{rank.description}&rdquo;
          </p>
        </div>

        {/* Estadísticas de la partida */}
        <div className="grid grid-cols-2 gap-2.5 mb-6 text-left">
          <div className="p-3 bg-zinc-950/50 border border-zinc-800/80 rounded-xl">
            <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
              Puntos Totales
            </span>
            <span className="text-lg font-black text-zinc-100">
              {score.toLocaleString()} <span className="text-xs text-zinc-400">PTS</span>
            </span>
          </div>

          <div className="p-3 bg-zinc-950/50 border border-zinc-800/80 rounded-xl">
            <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
              Nivel Llegado
            </span>
            <span className="text-lg font-black text-zinc-100">
              Nivel {level}
            </span>
          </div>

          <div className="p-3 bg-zinc-950/50 border border-zinc-800/80 rounded-xl">
            <span className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center gap-1">
              <FireIcon className="w-3.5 h-3.5 text-amber-400" />
              Mejor Racha
            </span>
            <span className="text-lg font-black text-zinc-100">
              {maxStreak} seguidas
            </span>
          </div>

          <div className="p-3 bg-zinc-950/50 border border-zinc-800/80 rounded-xl">
            <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
              Precisión
            </span>
            <span className="text-lg font-black text-zinc-100">
              {accuracy}% <span className="text-xs text-zinc-400">({totalCorrect}/{totalAnswered})</span>
            </span>
          </div>
        </div>

        {/* Notificación de Ranking */}
        {playerRankPosition && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
            <TrophyIcon className="w-4 h-4 text-amber-400" />
            <span>¡Tu récord quedó en el puesto #{playerRankPosition} del ranking!</span>
          </div>
        )}

        {/* Botones de acción */}
        <div className="space-y-2.5">
          <button
            onClick={onRestart}
            className="w-full py-3 px-4 bg-zinc-100 hover:bg-white text-zinc-950 font-black rounded-xl text-sm transition-all transform active:scale-95 shadow-lg shadow-white/5"
          >
            Volver a Jugar
          </button>

          <button
            onClick={onOpenLeaderboard}
            className="w-full py-2.5 px-4 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
          >
            <TrophyIcon className="w-4 h-4 text-amber-400" />
            Ver Tabla de Clasificación
          </button>
        </div>
      </div>
    </div>
  );
};
