import React from 'react';
import { motion } from 'framer-motion';

export function Pitch3D({ heatmap, vectors }: { heatmap: any[], vectors: any[] }) {
  return (
    <div className="relative w-full aspect-[4/3] bg-emerald-950/40 rounded-[48px] border border-emerald-500/10 overflow-hidden perspective-1000 rotate-x-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] group">
        <div className="absolute inset-6 border-2 border-emerald-500/10 rounded-2xl" />
        <div className="absolute inset-y-6 left-1/2 w-0.5 bg-emerald-500/10" />
        
        {/* Heatmap Anomalies */}
        {heatmap?.map((p, i) => (
            <motion.div
                key={`h-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                    scale: [1, 2.5, 1], 
                    opacity: [0.1, 0.4, 0.1],
                    x: `${p.x}%`,
                    y: `${p.y}%`
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 blur-2xl"
            />
        ))}

        {/* Attack Vectors (The Oracle Innovation) */}
        {vectors?.map((v, i) => (
            <svg key={`v-${i}`} className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.line
                    x1={`${v.x1}%`} y1={`${v.y1}%`}
                    x2={`${v.x2}%`} y2={`${v.y2}%`}
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="10 5"
                    initial={{ strokeDashoffset: 100, opacity: 0 }}
                    animate={{ strokeDashoffset: 0, opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <circle cx={`${v.x2}%`} cy={`${v.y2}%`} r="4" fill="#10b981" className="animate-pulse" />
            </svg>
        ))}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.6em]">Tactical Vector Overlord V6</span>
        </div>
    </div>
  );
}
