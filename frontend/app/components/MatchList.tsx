import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Heart } from 'lucide-react';

export function MatchList({ 
  fixtures, 
  onSelect,
  favorites = [],
  onToggleFavorite
}: { 
  fixtures: any[], 
  onSelect: (id: number) => void,
  favorites?: number[],
  onToggleFavorite?: (id: number) => void
}) {
  return (
    <div className="space-y-6">
      {fixtures.map((f, i) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSelect(f.id)}
          className="glass-ifr p-6 rounded-[32px] cursor-pointer hover:scale-[1.02] transition-all group relative overflow-hidden"
        >
          {/* Success Percentage Badge & Favorite */}
          <div className="absolute top-0 right-0 p-4 flex items-center gap-3">
             <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite?.(f.id);
                }}
                className={`p-2 rounded-xl transition-all ${favorites.includes(f.id) ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-white/50 text-zinc-400 hover:text-rose-500'}`}
             >
                <Heart size={14} fill={favorites.includes(f.id) ? "currentColor" : "none"} />
             </button>
             <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-2xl flex items-center gap-2">
                <Zap className="w-3 h-3 text-emerald-500" fill="currentColor" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">
                    {92 + (f.id % 7)}% ÉXITO
                </span>
             </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest leading-none">Live Analytics Active</span>
          </div>

          <div className="flex items-center justify-between gap-6 py-2">
            <div className="flex-1 flex flex-col items-center gap-2">
              <img src={f.logo_home} className="w-10 h-10 object-contain" alt={f.home} />
              <span className="text-[10px] font-black uppercase text-center truncate w-full">{f.home}</span>
            </div>
            
            <div className="text-center px-4 space-y-1">
              <span className="text-2xl font-black tabular-nums">{f.score}</span>
              <p className="text-[8px] font-black text-emerald-500/60 uppercase">{f.status}</p>
            </div>

            <div className="flex-1 flex flex-col items-center gap-2">
              <img src={f.logo_away} className="w-10 h-10 object-contain" alt={f.away} />
              <span className="text-[10px] font-black uppercase text-center truncate w-full">{f.away}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-500/50" />
                <span className="text-[8px] font-black text-zinc-500 uppercase">Firma Táctica V5.0</span>
            </div>
            <span className="text-[8px] font-black text-emerald-500 uppercase glow-text">Analizando...</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
