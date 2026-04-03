import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, AlertCircle, TrendingUp } from 'lucide-react';

const MOCK_INSIGHTS = [
  "¡ALERTA!: Presión asfixiante del Villarreal en el área rival. Probabilidad de gol +82%.",
  "TENDENCIA: Celta está perdiendo duelos en el lateral izquierdo. Peligro de córner elevado.",
  "IA INSIGHT: xG proyectado ha subido a 1.84 en los últimos 3 minutos.",
  "SISTEMA: Detección de fatiga en el mediocentro defensivo. Espacios abiertos para remates lejanos."
];

export function AITicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MOCK_INSIGHTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-10 bg-emerald-500/10 border-y border-emerald-500/20 backdrop-blur-xl flex items-center overflow-hidden">
      <div className="h-full px-4 bg-emerald-500 flex items-center gap-2 z-10 shadow-[20px_0_40px_rgba(16,185,129,0.3)]">
        <Zap className="w-4 h-4 text-black" fill="currentColor" />
        <span className="text-[10px] font-black text-black uppercase tracking-widest whitespace-nowrap">IA_LIVE_ALERTS</span>
      </div>
      
      <div className="flex-1 px-6 whitespace-nowrap">
        <AnimatePresence mode="wait">
          <motion.p 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[11px] font-bold text-emerald-400 italic"
          >
            {MOCK_INSIGHTS[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="px-4 text-emerald-500/30">
        <TrendingUp className="w-4 h-4" />
      </div>
    </div>
  );
}
