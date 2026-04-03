"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Zap, Menu, ChevronLeft, Target, Activity, ShieldAlert, Cpu, Sparkles, SlidersHorizontal, Scale, Search, X, MessageSquareQuote, TrendingUp, Wallet, ArrowUpRight, Power, Radio, Layers, Brain, Network, GitBranch, Mic2, FileText, BarChart3, Map, Compass, ShieldCheck, Coins, Radar, Heart, AlertTriangle, ShieldOff, Timer, RotateCcw, Droplets, Sun, Waves } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { AITicker } from './components/AITicker';
import { AboutUs } from './components/AboutUs';
import { MatchList } from './components/MatchList';
import { AIChat } from './components/AIChat';
import { Pitch3D } from './components/Pitch3D';
import { NeuralBackground } from './components/NeuralBackground';

export default function Home() {
  const [view, setView] = useState<'list' | 'detail' | 'explorer' | 'about' | 'zen'>('list');
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [selectedFixture, setSelectedFixture] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [godMode, setGodMode] = useState(true);
  
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/fixtures').then(res => res.json()).then(setFixtures);
  }, []);

  useEffect(() => {
    if (view === 'detail' && selectedFixture) {
        ws.current = new WebSocket('ws://localhost:8000/live');
        ws.current.onmessage = (event) => setData(JSON.parse(event.data));
        return () => ws.current?.close();
    }
  }, [view, selectedFixture]);

  return (
    <div className={`min-h-screen transition-all duration-1000 ${godMode ? 'bg-[#f8fafc]' : 'bg-[#010804]'} ${godMode ? 'text-zinc-900' : 'text-white'} overflow-x-hidden relative`}>
      {godMode ? (
          <div className="fixed inset-0 bg-gradient-to-br from-white via-emerald-50 to-blue-50 opacity-100 pointer-events-none z-0" />
      ) : <NeuralBackground />}
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} theme={theme} setTheme={() => {}} lang="es" setLang={() => {}} />
      <AITicker />

      <header className={`sticky top-6 z-50 h-24 flex items-center justify-between px-8 transition-all duration-1000 border mx-6 rounded-[40px] ${godMode ? 'bg-white/40 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.05)] border-white/80' : 'bg-black/60 shadow-2xl border-white/5'}`}>
        <div className="flex items-center gap-6">
            <Menu className={`w-8 h-8 cursor-pointer ${godMode ? 'text-zinc-400' : 'text-emerald-400'}`} onClick={() => setSidebarOpen(true)} />
            <div onClick={() => setView('list')} className="cursor-pointer">
                <h1 className={`text-3xl font-black tracking-tighter italic flex items-center gap-3 ${godMode ? 'text-zinc-900' : 'text-white'}`}>
                    ZEN_V15 <Sun className={`w-8 h-8 ${godMode ? 'text-orange-400 animate-spin-slow' : 'text-emerald-400'}`} />
                </h1>
                <span className={`text-[8px] font-black uppercase tracking-[1.3em] ${godMode ? 'text-zinc-400' : 'text-emerald-600/80'}`}>PURE_MARKET_ZENITH</span>
            </div>
        </div>
        <div className="flex items-center gap-4">
             <button onClick={() => setGodMode(!godMode)} className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-700 ${godMode ? 'bg-zinc-900 text-white scale-110 shadow-2xl' : 'bg-emerald-500 text-black'}`}>
                <Sparkles className="w-8 h-8" />
            </button>
        </div>
      </header>

      <main className="p-6 max-w-lg mx-auto pb-44 pt-12 relative z-10">
        <AnimatePresence mode="wait">
          {view === 'zen' ? (
                <motion.div key="zen" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                    <div className="flex justify-between items-center px-4">
                        <h2 className="text-4xl font-black tracking-tighter italic">Zen Frequency</h2>
                        <button onClick={() => setView('list')} className="p-4 bg-black/5 rounded-3xl"><X size={24}/></button>
                    </div>
                    
                    <div className="glass-ifr p-16 rounded-[80px] bg-white/60 border border-white shadow-2xl text-center space-y-10 relative overflow-hidden">
                         <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <Waves className="w-64 h-64 text-blue-400 animate-pulse" />
                         </div>
                         <div className="relative z-10 space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Sonic Sync Frequency</p>
                            <p className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500">{data?.frequency || '1.00'} Hz</p>
                         </div>
                         {/* SONIC WAVE ANIMATION */}
                         <div className="flex justify-center gap-1 h-12 items-center">
                            {[...Array(12)].map((_, i) => (
                                <motion.div 
                                    key={i}
                                    animate={{ height: [10, 40, 10] }}
                                    transition={{ duration: 1/ (data?.frequency || 1), repeat: Infinity, delay: i * 0.1 }}
                                    className="w-1.5 bg-blue-400 rounded-full"
                                />
                            ))}
                         </div>
                    </div>
                </motion.div>
          ) : view === 'list' ? (
                <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                    <MatchList fixtures={fixtures} onSelect={(id) => { setSelectedFixture(fixtures.find(f => f.id === id)); setView('detail'); }} />
                </motion.div>
          ) : (
            <motion.div key="detail" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
                <button onClick={() => setView('list')} className={`text-[10px] font-black uppercase flex items-center gap-3 tracking-widest ${godMode ? 'text-zinc-400' : 'text-emerald-500'}`}><ChevronLeft size={18}/> Zenith Hub</button>

                <Pitch3D heatmap={[]} vectors={[]} />

                {/* Scoreboard Zen V15 */}
                <section className={`rounded-[80px] p-16 border transition-all duration-1000 relative overflow-hidden text-center ${godMode ? 'bg-white border-zinc-100 shadow-[0_80px_150px_rgba(0,0,0,0.08)]' : 'glass-ifr border-white/10'}`}>
                    <div className="flex justify-between items-center px-4 mb-10 relative z-10 transition-transform duration-1000">
                        <TeamHeader logo={selectedFixture?.logo_home} name={selectedFixture?.home} mode={godMode} />
                        <h3 className={`text-9xl font-black tracking-tighter tabular-nums ${godMode ? 'text-zinc-900' : 'text-white'}`}>{data?.score || "3-1"}</h3>
                        <TeamHeader logo={selectedFixture?.logo_away} name={selectedFixture?.away} mode={godMode} />
                    </div>
                    <div className={`py-4 px-12 inline-block rounded-full border text-[10px] font-black tracking-[0.6em] ${godMode ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-emerald-500/20 text-emerald-400 border-emerald-400'}`}>
                        PURE_ZEN_ACTIVE
                    </div>
                </section>

                {/* MARKET MAKER PREDICTION (Phase 28 Innovation) */}
                <div className="grid grid-cols-1 gap-8">
                     <div className={`p-12 rounded-[64px] border flex items-center justify-between transition-all ${godMode ? 'bg-blue-50 border-blue-100' : 'glass-ifr border-white/5'}`}>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">Market Maker Predictor</p>
                            <p className={`text-2xl font-black ${godMode ? 'text-blue-600' : 'text-white'}`}>{data?.market_maker || 'ANALYZING'}</p>
                        </div>
                        <div className={`p-5 rounded-3xl ${godMode ? 'bg-blue-600 text-white shadow-xl' : 'bg-white/10 text-white'}`}>
                            <Radio className="w-8 h-8 animate-pulse" />
                        </div>
                     </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                     <div className={`p-10 rounded-[56px] border ${godMode ? 'bg-white border-zinc-100' : 'glass-ifr border-white/5'} space-y-3`}>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">IA Perception</p>
                        <p className={`text-5xl font-black ${godMode ? 'text-zinc-900' : 'text-white'}`}>{data?.confidence || '99.8'}%</p>
                    </div>
                    <button onClick={() => setView('zen')} className={`p-10 rounded-[56px] border transition-all ${godMode ? 'bg-white border-zinc-100' : 'glass-ifr border-white/5'} flex flex-col items-center justify-center hover:scale-105`}>
                        <Waves className="w-8 h-8 text-blue-400" />
                        <p className={`text-[10px] font-black uppercase tracking-widest mt-2 ${godMode ? 'text-zinc-900' : 'text-white'}`}>Sonic Sync</p>
                    </button>
                </div>

                <section className={`rounded-[56px] p-12 border text-center italic font-bold text-xl leading-relaxed ${godMode ? 'bg-white border-zinc-100 text-zinc-500 shadow-sm' : 'glass-ifr border-white/5 text-zinc-300'}`}>
                    "Sintonizando la frecuencia de mercado perfecta. El Oráculo Zen detecta calma absoluta antes del clímax financiero."
                </section>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <nav className={`fixed bottom-0 inset-x-0 h-28 backdrop-blur-3xl border-t flex items-center justify-around px-10 z-50 transition-all duration-1000 ${godMode ? 'bg-white/80 border-zinc-200' : 'bg-black/95 border-white/10'}`}>
        <TabItem icon={<Target />} label="Zenith" active={view === 'list'} onClick={() => setView('list')} mode={godMode}/>
        <TabItem icon={<Waves />} label="Sonic" active={view === 'zen'} onClick={() => setView('zen')} mode={godMode}/>
        <TabItem icon={<Sparkles />} label="Prime" active={false} onClick={() => {}} mode={godMode}/>
      </nav>
    </div>
  );
}

function TeamHeader({ logo, name, mode }: any) {
    return (
        <div className="text-center flex-1 space-y-5">
            <img src={logo} className={`w-28 h-28 p-6 rounded-[40px] mx-auto transition-transform hover:scale-110 shadow-sm ${mode ? 'bg-zinc-50' : 'bg-white/5'}`} />
            <p className={`text-[10px] font-black uppercase tracking-widest truncate ${mode ? 'text-zinc-400' : 'text-zinc-500'}`}>{name}</p>
        </div>
    );
}

function TabItem({ icon, label, active, onClick, mode }: any) {
    return (
        <button onClick={onClick} className={`flex flex-col items-center gap-3 transition-all ${active ? (mode ? 'text-zinc-900 scale-110' : 'text-white scale-110') : 'text-zinc-400 hover:text-zinc-600'}`}>
            <div className={`p-4 rounded-[28px] transition-all ${active ? (mode ? 'bg-zinc-100 shadow-sm' : 'bg-white/10 border border-white/20 shadow-xl') : ''}`}>{icon}</div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">{label}</span>
        </button>
    );
}
