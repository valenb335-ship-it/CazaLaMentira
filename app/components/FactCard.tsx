import React from 'react';
import { Fact } from '../types/game';

interface FactCardProps {
  fact: Fact;
  index: number;
  hasAnswered: boolean;
  isSelected: boolean;
  onSelect: (factId: string) => void;
}

export const FactCard: React.FC<FactCardProps> = ({
  fact,
  hasAnswered,
  isSelected,
  onSelect,
}) => {
  // Determinar estilos según el estado de la ronda
  let columnStyle = 'bg-zinc-950 border-zinc-900 text-zinc-300 hover:bg-zinc-900/60 hover:text-zinc-100 hover:border-zinc-800';
  let badge: React.ReactNode = null;

  if (hasAnswered) {
    if (fact.isLie) {
      // Esta es la MENTIRA que el usuario debía encontrar -> VERDE ESMERALDA
      columnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-100 shadow-[0_0_35px_rgba(16,185,129,0.25)] animate-pop-success';
      badge = (
        <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-900/40 border border-emerald-700/50 px-3 py-1 rounded-full mb-3">
          Mentira (Correcto) ✓
        </span>
      );
    } else if (isSelected && !fact.isLie) {
      // El usuario eligió este dato, pero era una VERDAD -> ROJO CARMESÍ
      columnStyle = 'bg-rose-950/40 border-rose-500 text-rose-100 shadow-[0_0_35px_rgba(244,63,94,0.25)] animate-shake';
      badge = (
        <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-rose-400 bg-rose-900/40 border border-rose-700/50 px-3 py-1 rounded-full mb-3">
          Verdad (Incorrecto) ✕
        </span>
      );
    } else {
      // Dato verdadero no seleccionado
      columnStyle = 'bg-zinc-950/40 border-zinc-900/60 text-zinc-500 opacity-50';
      badge = (
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-3">
          Dato Real
        </span>
      );
    }
  }

  return (
    <button
      type="button"
      onClick={() => !hasAnswered && onSelect(fact.id)}
      disabled={hasAnswered}
      className={`flex-1 h-full w-full flex flex-col justify-center items-center text-center p-6 sm:p-10 lg:p-12 border transition-all duration-300 relative group select-none ${columnStyle} ${
        !hasAnswered ? 'cursor-pointer active:scale-[0.995]' : 'cursor-default'
      }`}
    >
      {/* Badge de estado tras responder */}
      {hasAnswered && badge}

      {/* Texto principal del dato curioso sobre toda la pantalla */}
      <div className="max-w-md mx-auto my-auto flex flex-col justify-center items-center">
        <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed tracking-wide">
          {fact.text}
        </p>

        {/* Explicación didáctica revelada en la propia columna */}
        {hasAnswered && (
          <div className="mt-6 pt-5 border-t border-current/20 text-xs sm:text-sm font-normal opacity-90 leading-relaxed text-left animate-pop-success">
            {fact.explanation}
          </div>
        )}
      </div>

      {/* Indicador sutil de selección previa a la respuesta */}
      {!hasAnswered && (
        <div className="mt-auto pt-4 text-[11px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors">
          Seleccionar
        </div>
      )}
    </button>
  );
};
