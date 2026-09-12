'use client';

import dynamic from 'next/dynamic';

const TriviaGame = dynamic(
  () => import('./components/TriviaGame').then((mod) => mod.TriviaGame),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-zinc-200 text-sm shadow-inner animate-pulse">
            2V
          </div>
          <p className="animate-pulse text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Cargando Caza la Mentira...
          </p>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  return <TriviaGame />;
}
