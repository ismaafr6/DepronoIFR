import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

export function OddsExplorer({ odds }: { odds: any[] }) {
  return (
    <div className="space-y-8">
      <div className="px-4 space-y-2">
        <h2 className="text-4xl font-black italic tracking-tighter text-zinc-900">PROFIT_SCANNER</h2>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.8em]">SCANNING_VALUE_BETS_V16</span>
        </div>
      </div>

      <div className="space-y-6">
        {odds.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-[40px] opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 blur"></div>
            
            <div className="relative glass-ifr p-8 rounded-[40px] border border-white/80 bg-white/40 backdrop-blur-xl flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{o.league}</span>
                    <h3 className="text-xl font-black text-zinc-900 tracking-tight">{o.match}</h3>
                </div>
                <div className="bg-emerald-500 text-white px-4 py-2 rounded-2xl text-[10px] font-black shadow-lg shadow-emerald-500/20">
                    ROI {o.roi_projected}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <DataCard label="Mercado" value={o.market} icon={<Target className="w-3 h-3"/>} />
                <DataCard label="Cuota" value={o.odds.toFixed(2)} icon={<TrendingUp className="w-3 h-3"/>} />
                <DataCard label="Confianza" value={o.confidence} icon={<ShieldCheck className="w-3 h-3"/>} />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-zinc-900 text-white flex items-center justify-center font-black text-xs">
                        {o.value_score}
                    </div>
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">VALUE_SCORE</span>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase group/btn">
                    Ver Análisis <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DataCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white/50 p-4 rounded-3xl border border-white flex flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-2 text-zinc-400">
                {icon}
                <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
            </div>
            <span className="text-xs font-black text-zinc-900 truncate">{value}</span>
        </div>
    )
}
