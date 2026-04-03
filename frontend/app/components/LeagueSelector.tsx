import React, { useState } from 'react';

const MOCK_LEAGUES = [
  { id: 140, name: "La Liga", country: "Spain" },
  { id: 39, name: "Premier League", country: "England" },
  { id: 135, name: "Serie A", country: "Italy" },
  { id: 78, name: "Bundesliga", country: "Germany" },
  { id: 2, name: "Champions League", country: "Europe" }
];

export function LeagueSelector({ onSelect }: { onSelect: (id: number) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="glass px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all border border-white/5 font-bold text-sm"
      >
        <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Explorar Ligas
      </button>

      {isOpen && (
        <div className="absolute top-full mt-4 w-64 glass rounded-2xl p-4 z-50 border border-white/10 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-2">
            {MOCK_LEAGUES.map((league) => (
              <button 
                key={league.id}
                onClick={() => {
                  onSelect(league.id);
                  setIsOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all text-xs font-bold flex justify-between items-center"
              >
                {league.name}
                <span className="text-[10px] text-white/30 font-medium">{league.country}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
