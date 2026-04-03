import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Cpu, TrendingUp, AlertTriangle } from 'lucide-react';

export function AboutUs({ onClose }: { onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="space-y-12 pb-20"
    >
      <header className="text-center space-y-4">
        <h2 className="text-5xl font-black text-gradient tracking-tighter">DepronoIFR</h2>
        <p className="text-sm text-emerald-500/60 font-bold uppercase tracking-[0.4em]">The Science of Sports Intelligence</p>
      </header>

      <section className="glass-ifr p-8 rounded-[40px] space-y-6">
        <h3 className="text-xl font-black flex items-center gap-3">
          <Cpu className="text-emerald-500" /> El Motor DepronoIFR
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Nuestra tecnología de **IA Tactica Universal** no solo predice, sino que razona. Analizamos más de 120 puntos de datos por segundo, incluyendo la fatiga de los jugadores, la densidad del bloque defensivo y la saturación de ataques en las bandas para ofrecer una precisión que roza la perfección estadística.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeatureBox 
            icon={<TrendingUp />} 
            title="Momentum Dinámico" 
            desc="Calculamos quién tiene el control del partido basándonos en la 'zona de influencia'. Si un equipo domina el mediocampo, nuestro gráfico de presión lo reflejará al instante."
        />
        <FeatureBox 
            icon={<ShieldCheck />} 
            title="Security Score" 
            desc="Cada pronóstico se somete a un test de estrés de volatilidad. Solo las predicciones con baja desviación estándar reciben nuestra etiqueta de 'Confianza Alta'."
        />
      </div>

      <section className="bg-emerald-500/5 p-10 rounded-[48px] border border-emerald-500/10 space-y-8">
        <h3 className="text-2xl font-black text-center">¿Cómo Usar la App?</h3>
        <div className="space-y-6">
          <Step num="1" title="Explora el Globo" desc="Usa el Explorer para encontrar ligas en cualquier continente. Filtra por país y accede a calendarios completos." />
          <Step num="2" title="Analiza el Detalle" desc="Entra en un partido 'LIVE' para ver el flujo de datos en tiempo real y la pizarra táctica con los onces oficiales." />
          <Step num="3" title="Consulta al Oráculo" desc="Usa el Buscador IA para preguntas tácticas profundas. Nuestra IA te fundamentará su respuesta con datos matemáticos exactos." />
        </div>
      </section>

      <section className="p-8 rounded-[40px] border border-red-500/10 bg-red-500/5 space-y-4">
        <h4 className="text-xs font-black text-red-500 uppercase flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Deslinde de Responsabilidad
        </h4>
        <p className="text-[10px] text-zinc-500 leading-normal uppercase font-bold">
            DepronoIFR es una herramienta analítica de alta precisión. No garantizamos resultados financieros ni retornos de inversión. El deporte es imprevisible. Juega con inteligencia y responsabilidad. +18.
        </p>
      </section>

      <button 
        onClick={onClose}
        className="w-full py-6 bg-emerald-500 text-black rounded-3xl font-black text-lg shadow-[0_20px_40px_-5px_rgba(16,185,129,0.3)] hover:scale-[1.02] transition-all"
      >
        VOLVER AL TABLERO
      </button>
    </motion.div>
  );
}

function FeatureBox({ icon, title, desc }: any) {
  return (
    <div className="glass-ifr p-8 rounded-[32px] space-y-4 border border-white/5">
      <div className="text-emerald-500 scale-125 mb-2">{icon}</div>
      <h4 className="text-lg font-black">{title}</h4>
      <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ num, title, desc }: any) {
  return (
    <div className="flex gap-6 items-start">
      <div className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center font-black flex-shrink-0">{num}</div>
      <div className="space-y-1">
        <h4 className="font-black text-zinc-200">{title}</h4>
        <p className="text-xs text-zinc-500">{desc}</p>
      </div>
    </div>
  );
}
