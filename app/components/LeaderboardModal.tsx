import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types/game';
import { getLeaderboard, getLeaderboardWithRemote, getStoredPlayerName, savePlayerName } from '../utils/leaderboard';
import { isSupabaseConfigured } from '../lib/supabase';
import { TrophyIcon, CrossIcon } from './Icons';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => getLeaderboard());
  const [playerName, setPlayerName] = useState<string>(() => getStoredPlayerName());
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(() => getStoredPlayerName());

  // Cargar datos remotos de Supabase al abrir el modal si está disponible
  useEffect(() => {
    if (isOpen && isSupabaseConfigured) {
      getLeaderboardWithRemote().then((remoteEntries) => {
        if (remoteEntries && remoteEntries.length > 0) {
          setEntries(remoteEntries);
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      savePlayerName(tempName.trim());
      setPlayerName(tempName.trim());
      setIsEditingName(false);
      setEntries(getLeaderboard());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-pop-success">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Encabezado del Modal */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <TrophyIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-zinc-100 uppercase tracking-wide">
                  Salón de la Fama
                </h3>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold border ${
                  isSupabaseConfigured
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700/50'
                }`}>
                  {isSupabaseConfigured ? '🟢 Supabase' : '⚪ Local'}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Ranking de Cazadores de Mentiras
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <CrossIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Configuración de Apodo del Jugador */}
        <div className="px-5 py-3 bg-zinc-950/60 border-b border-zinc-800/80 flex items-center justify-between text-xs">
          {isEditingName ? (
            <form onSubmit={handleSaveName} className="flex items-center gap-2 w-full">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                maxLength={20}
                placeholder="Ingresa tu apodo..."
                className="bg-zinc-900 border border-zinc-700 rounded-md px-2.5 py-1 text-zinc-200 text-xs focus:outline-none focus:border-zinc-500 flex-1"
                autoFocus
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-zinc-200 hover:bg-white text-zinc-900 font-bold rounded-md"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="px-2 py-1 text-zinc-400 hover:text-zinc-200"
              >
                Cancelar
              </button>
            </form>
          ) : (
            <>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <span>Tu apodo:</span>
                <span className="font-bold text-zinc-200">{playerName}</span>
              </div>
              <button
                onClick={() => {
                  setTempName(playerName);
                  setIsEditingName(true);
                }}
                className="text-zinc-400 hover:text-zinc-200 underline font-medium"
              >
                Cambiar
              </button>
            </>
          )}
        </div>

        {/* Tabla de Clasificación o Estado Vacío */}
        <div className="overflow-y-auto p-4 space-y-2 flex-1">
          {entries.length === 0 ? (
            <div className="py-12 px-4 text-center flex flex-col items-center justify-center text-zinc-500">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center mb-3 text-amber-400/80">
                <TrophyIcon className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-zinc-200">
                Aún no hay puntuaciones registradas
              </p>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                ¡Sé el primer jugador real en completar una partida para estrenar el ranking!
              </p>
            </div>
          ) : (
            entries.map((entry, index) => {
              const isTop3 = index < 3;
              const rankMedals = ['🥇', '🥈', '🥉'];

              return (
                <div
                  key={entry.id || index}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    entry.isCurrentPlayer
                      ? 'bg-emerald-950/30 border-emerald-500/50 shadow-sm'
                      : 'bg-zinc-950/40 border-zinc-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 text-center font-bold text-xs">
                      {isTop3 ? (
                        <span className="text-base">{rankMedals[index]}</span>
                      ) : (
                        <span className="text-zinc-500">#{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-sm font-bold ${entry.isCurrentPlayer ? 'text-emerald-300' : 'text-zinc-200'}`}>
                          {entry.playerName}
                        </span>
                        {entry.isCurrentPlayer && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">
                            TÚ
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Nivel {entry.level} • {entry.rankTitle}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black text-zinc-100">
                      {entry.score.toLocaleString()} <span className="text-[10px] text-zinc-400 font-semibold">PTS</span>
                    </div>
                    <div className="text-[10px] text-zinc-500">{entry.date}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pie del modal */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 text-center">
          <p className="text-xs text-zinc-400">
            Los puntos se registran al finalizar cada partida o al batir tu récord personal.
          </p>
        </div>
      </div>
    </div>
  );
};
