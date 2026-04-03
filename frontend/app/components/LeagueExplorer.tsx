import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export function LeagueExplorer({ 
  countries, 
  onLeagueSelect 
}: { 
  countries: any[], 
  onLeagueSelect: (leagueId: number) => void 
}) {
  return (
    <div className="space-y-8">
      {countries.map((country) => (
        <div key={country.code} className="space-y-3">
          <div className="flex items-center gap-3 px-2">
            <img src={country.flag} className="w-5 h-5 rounded-full object-cover" alt={country.name} />
            <h4 className="text-[11px] font-black uppercase text-zinc-500 tracking-[0.3em]">{country.name}</h4>
          </div>
          <div className="space-y-2">
            {country.leagues?.map((league: any) => (
              <button 
                key={league.id}
                onClick={() => onLeagueSelect(league.id)}
                className="w-full glass-ifr p-5 rounded-3xl flex items-center justify-between hover:bg-emerald-500/5 transition-all group border border-white/5"
              >
                <div className="flex items-center gap-4">
                  <img src={league.logo} className="w-10 h-10 object-contain" alt={league.name} />
                  <span className="text-sm font-black tracking-tight">{league.name}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
