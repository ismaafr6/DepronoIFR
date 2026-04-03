import React from 'react';
import { motion } from 'framer-motion';
import { X, Moon, Sun, Languages, Star, LogOut, Info } from 'lucide-react';

export function Sidebar({ 
  isOpen, 
  onClose, 
  theme, 
  setTheme, 
  lang, 
  setLang 
}: { 
  isOpen: boolean, 
  onClose: () => void,
  theme: 'dark' | 'light',
  setTheme: (t: 'dark' | 'light') => void,
  lang: 'es' | 'en',
  setLang: (l: 'es' | 'en') => void
}) {
  return (
    <motion.div 
      initial={{ x: '-100%' }}
      animate={{ x: isOpen ? 0 : '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[var(--sidebar-bg)] backdrop-blur-2xl z-[100] border-r border-white/5 shadow-2xl p-8"
    >
      <div className="flex justify-between items-center mb-12">
        <span className="text-2xl font-black text-gradient">DepronoIFR</span>
        <button onClick={onClose} className="p-2 bg-zinc-800 rounded-xl"><X className="w-5 h-5" /></button>
      </div>

      <div className="space-y-10">
        {/* Theme Sector */}
        <section className="space-y-4">
          <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em]">Apariencia</h4>
          <div className="flex bg-zinc-950/50 p-1 rounded-2xl border border-white/5">
            <button 
              onClick={() => setTheme('dark')}
              className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${theme === 'dark' ? 'bg-emerald-500 text-black' : 'text-zinc-500'}`}
            >
              <Moon className="w-4 h-4" /> Oscuro
            </button>
            <button 
              onClick={() => setTheme('light')}
              className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${theme === 'light' ? 'bg-emerald-500 text-black' : 'text-zinc-500'}`}
            >
              <Sun className="w-4 h-4" /> Claro
            </button>
          </div>
        </section>

        {/* Language Sector */}
        <section className="space-y-4">
          <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em]">Idioma</h4>
          <div className="flex bg-zinc-950/50 p-1 rounded-2xl border border-white/5">
            <button 
              onClick={() => setLang('es')}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${lang === 'es' ? 'bg-emerald-500 text-black' : 'text-zinc-500'}`}
            >
              Español
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${lang === 'en' ? 'bg-emerald-500 text-black' : 'text-zinc-500'}`}
            >
              English
            </button>
          </div>
        </section>

        {/* Links */}
        <div className="space-y-2 pt-8">
          <SidebarItem icon={<Star />} label={lang === 'es' ? 'Suscripción Premium' : 'Premium Subscription'} />
          <SidebarItem icon={<Info />} label={lang === 'es' ? 'Acerca de DepronoIFR' : 'About DepronoIFR'} />
          <SidebarItem icon={<LogOut />} label={lang === 'es' ? 'Cerrar Sesión' : 'Logout'} danger />
        </div>
      </div>
    </motion.div>
  );
}

function SidebarItem({ icon, label, danger }: any) {
  return (
    <button className={`w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all ${danger ? 'text-red-500' : 'text-zinc-400'}`}>
      <div className={danger ? 'text-red-500' : 'text-emerald-500'}>{icon}</div>
      <span className="text-sm font-bold">{label}</span>
    </button>
  );
}
