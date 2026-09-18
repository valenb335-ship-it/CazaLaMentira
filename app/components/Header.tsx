import React from 'react';
import { HeartIcon, TrophyIcon, VolumeIcon, VolumeMuteIcon, FireIcon } from './Icons';

interface HeaderProps {
  level: number;
  score: number;
  streak: number;
  lives: number;
  soundEnabled: boolean;
  isStudyMode: boolean;
  studyTitle?: string;
  totalStudyRounds?: number;
  onToggleSound: () => void;
  onOpenLeaderboard: () => void;
  onOpenStudyModal: () => void;
  onExitStudyMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  level,
  score,
  streak,
  lives,
  soundEnabled,
  isStudyMode,
  studyTitle,
  totalStudyRounds,
  onToggleSound,
  onOpenLeaderboard,
  onOpenStudyModal,
  onExitStudyMode,
}) => {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md z-20">
      {/* Izquierda: Vidas y Nivel / Progreso de Estudio */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Vidas */}
        <div className="flex items-center gap-1">
          <HeartIcon filled={lives >= 1} className="w-5 h-5" />
          <HeartIcon filled={lives >= 2} className="w-5 h-5" />
          <HeartIcon filled={lives >= 3} className="w-5 h-5" />
        </div>

        {/* Nivel / Pregunta */}
        <span className="text-xs font-bold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md">
          {isStudyMode && totalStudyRounds
            ? `Pregunta ${level}/${totalStudyRounds}`
            : `Nv. ${level}`}
        </span>

        {/* Badge de Modo Estudio si está activo */}
        {isStudyMode && studyTitle && (
          <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2.5 py-0.5 rounded-md">
            <span>📚</span>
            <span className="font-semibold truncate max-w-[150px]">{studyTitle}</span>
          </div>
        )}
      </div>

      {/* Centro: Puntuación y Racha */}
      <div className="flex items-center gap-2">
        <span className="text-sm sm:text-base font-black tracking-tight text-zinc-100">
          {score.toLocaleString()} <span className="text-[10px] text-zinc-500 font-semibold uppercase">pts</span>
        </span>
        {streak > 1 && (
          <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-amber-400 bg-amber-950/40 border border-amber-800/40 px-1.5 py-0.2 rounded">
            <FireIcon className="w-3.5 h-3.5" />
            {streak}
          </span>
        )}
      </div>

      {/* Derecha: Botón Modo Estudio, Ranking y Sonido */}
      <div className="flex items-center gap-2">
        {/* Botón Modo Estudio / Cambiar Apuntes */}
        {isStudyMode ? (
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenStudyModal}
              className="px-2.5 py-1.5 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-700/50 text-emerald-300 rounded-lg text-xs font-bold transition-all"
              title="Cargar otros apuntes"
            >
              Cambiar Apuntes
            </button>
            <button
              onClick={onExitStudyMode}
              className="px-2 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-lg text-xs font-semibold transition-all"
              title="Volver a la trivia general"
            >
              Volver a Trivia
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenStudyModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-600/50 text-zinc-200 hover:text-emerald-300 rounded-lg text-xs font-bold transition-all shadow-sm group"
            title="Subir archivos o apuntes para estudiar"
          >
            <span>📚</span>
            <span className="hidden sm:inline">Modo Estudio</span>
          </button>
        )}

        {/* Botón Ranking */}
        <button
          onClick={onOpenLeaderboard}
          className="p-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 hover:border-zinc-700 text-amber-400 rounded-lg transition-colors"
          title="Ver Ranking"
          aria-label="Ver Ranking"
        >
          <TrophyIcon className="w-4 h-4" />
        </button>

        {/* Botón Sonido */}
        <button
          onClick={onToggleSound}
          className="p-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 rounded-lg transition-colors"
          title={soundEnabled ? 'Silenciar sonido' : 'Activar sonido'}
          aria-label={soundEnabled ? 'Silenciar sonido' : 'Activar sonido'}
        >
          {soundEnabled ? (
            <VolumeIcon className="w-4 h-4" />
          ) : (
            <VolumeMuteIcon className="w-4 h-4 text-zinc-600" />
          )}
        </button>
      </div>
    </header>
  );
};
