import React from 'react';
import { TriviaRound } from '../types/game';
import { CheckIcon, CrossIcon } from './Icons';

interface ExplanationDrawerProps {
  round: TriviaRound;
  isCorrect: boolean;
  pointsEarned: number;
  multiplier: number;
  speedBonus: number;
  onNextRound: () => void;
  isGameOver: boolean;
}

export const ExplanationDrawer: React.FC<ExplanationDrawerProps> = ({
  round,
  isCorrect,
  pointsEarned,
  multiplier,
  speedBonus,
  onNextRound,
  isGameOver,
}) => {
  const lieFact = round.facts.find((f) => f.isLie);
  const trueFacts = round.facts.filter((f) => !f.isLie);

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 p-6 rounded-2xl bg-zinc-900/95 border border-zinc-800 shadow-2xl backdrop-blur-sm animate-pop-success">
      {/* Resultado de la ronda */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
              isCorrect
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}
          >
            {isCorrect ? <CheckIcon className="w-6 h-6" /> : <CrossIcon className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-lg font-black text-zinc-100">
              {isCorrect ? '¡Excelente deducción!' : '¡Caíste en la trampa!'}
            </h3>
            <p className="text-xs text-zinc-400">
              {isCorrect
                ? `Identificaste la mentira y sumaste +${pointsEarned} PTS ${
                    multiplier > 1 ? `(Multiplicador ${multiplier}x)` : ''
                  }${speedBonus > 0 ? ` (+${speedBonus} bonus de rapidez)` : ''}`
                : 'La mentira era tan convincente que parecía real.'}
            </p>
          </div>
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={onNextRound}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all transform active:scale-95 shadow-lg flex items-center gap-2 ${
            isCorrect
              ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-emerald-500/20'
              : 'bg-zinc-100 hover:bg-white text-zinc-950 shadow-zinc-200/10'
          }`}
        >
          <span>{isGameOver ? 'Ver Resumen Final' : 'Siguiente Nivel'}</span>
          <span>→</span>
        </button>
      </div>

      {/* Desglose didáctico de los 3 datos */}
      <div className="mt-5 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          La Verdad Detrás de Cada Dato:
        </h4>

        {/* Explicación de la MENTIRA */}
        {lieFact && (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                La Mentira Desmontada
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
              {lieFact.explanation}
            </p>
          </div>
        )}

        {/* Explicación de las 2 VERDADES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {trueFacts.map((fact, idx) => (
            <div
              key={fact.id || idx}
              className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-left"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                  Dato Real #{idx + 1}
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                {fact.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
