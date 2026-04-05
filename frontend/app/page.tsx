"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Zap, Menu, ChevronLeft, Target, Activity, ShieldAlert, Cpu, Sparkles, SlidersHorizontal, Scale, Search, X, MessageSquareQuote, TrendingUp, Wallet, ArrowUpRight, Power, Radio, Layers, Brain, Network, GitBranch, Mic2, FileText, BarChart3, Map, Compass, ShieldCheck, Coins, Radar, Heart, AlertTriangle, ShieldOff, Timer, RotateCcw, Droplets, Sun, Waves, Lock, Key, Shield, Fingerprint, Eye } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { AITicker } from './components/AITicker';
import { AboutUs } from './components/AboutUs';
import { MatchList } from './components/MatchList';
import { AIChat } from './components/AIChat';
import { Pitch3D } from './components/Pitch3D';
import { NeuralBackground } from './components/NeuralBackground';
import { NotificationToast } from './components/NotificationToast';
import { OddsExplorer } from './components/OddsExplorer';

export default function Home() {
  const [view, setView] = useState<'list' | 'detail' | 'explorer' | 'about' | 'bastion' | 'odds'>('bastion');
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [selectedFixture, setSelectedFixture] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [odds, setOdds] = useState<any[]>([]);
  
  const [sovereignKey, setSovereignKey] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [godMode, setGodMode] = useState(true);
  
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const ws = useRef<WebSocket | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const WS_BASE = API_BASE.replace(/^http/, 'ws');

  // Load favorites
  useEffect(() => {
    const saved = localStorage.getItem('bastion_favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save favorites
  useEffect(() => {
    localStorage.setItem('bastion_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
    
    // Notify on toggle
    const fixture = fixtures.find(f => f.id === id);
    if (fixture) {
        addNotification(
            "Favorito Actualizado",
            `${fixture.home} vs ${fixture.away} ha sido ${favorites.includes(id) ? 'eliminado de' : 'añadido a'} tus favoritos.`,
            'info'
        );
    }
  };

  const addNotification = (title: string, message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [{ id, title, message, type }, ...prev]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const decryptPayload = (payload: any) => {
    if (payload.encrypted) {
        return JSON.parse(atob(payload.quantum_payload));
    }
    return payload;
  };

  const fetchWithBastion = async (url: string) => {
    const res = await fetch(url, {
        headers: { 
            'X-Sovereign-Key': sovereignKey,
            'X-Seed-Phrase': seedPhrase
        }
    });
    if (res.status === 403) throw new Error("BAD_CREDS");
    if (res.status === 423) throw new Error("LOCKED");
    const encrypted = await res.json();
    return decryptPayload(encrypted);
  };

  const unlockBastion = async () => {
    try {
        const data = await fetchWithBastion(`${API_BASE}/fixtures`);
        setFixtures(data);
        const logData = await fetchWithBastion(`${API_BASE}/bastion/logs`);
        setLogs(logData);
        setIsAuthorized(true);
        setView('list');
        fetchOdds(); // Pre-fetch odds
    } catch (e: any) {
        alert(e.message === "LOCKED" ? "BASTIÓN_CONGELADO_ATAQUE_DETECTADO" : "LLAVE_O_SEMILLA_INVALIDA");
    }
  };

  const fetchOdds = async () => {
    try {
        const oddsData = await fetchWithBastion(`${API_BASE}/odds`);
        setOdds(oddsData);
    } catch (e) {
        console.error("Failed to fetch odds", e);
    }
  };

  useEffect(() => {
    if (view === 'detail' && selectedFixture) {
        ws.current = new WebSocket(`${WS_BASE}/live`);
        ws.current.onmessage = (event) => {
            const encrypted = JSON.parse(event.data);
            setData(decryptPayload(encrypted));
        }
        return () => ws.current?.close();
    }
  }, [view, selectedFixture]);

  // Demo Notification logic: If a favorite team is in the fixtures, simulate an event
  useEffect(() => {
    if (isAuthorized && favorites.length > 0) {
        const favFixtures = fixtures.filter(f => favorites.includes(f.id));
        if (favFixtures.length > 0) {
            const timer = setTimeout(() => {
                addNotification(
                    "¡GOL DETECTADO!",
                    `Tu favorito ${favFixtures[0].home} ha marcado. El sistema está recalculando cuotas de rentabilidad.`,
                    'success'
                );
            }, 3000);
            return () => clearTimeout(timer);
        }
    }
  }, [isAuthorized, favorites]);

  if (!isAuthorized && view === 'bastion') {
    return (
        <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)] animate-pulse" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-ifr p-16 rounded-[80px] border border-blue-500/20 text-center space-y-10 max-w-lg w-full relative z-10 bg-gradient-to-b from-blue-500/5 to-transparent">
                <Shield className="w-24 h-24 mx-auto text-blue-400 drop-shadow-[0_0_40px_rgba(59,130,246,0.5)]" />
                <div className="space-y-4">
                    <h1 className="text-4xl font-black tracking-tighter italic text-white flex items-center justify-center gap-4">EL_BASTIÓN <Fingerprint size={32} /></h1>
                    <p className="text-[10px] font-black uppercase text-blue-400/80 tracking-[0.7em]">QUANTUM_MULTIFACTOR_AUTH</p>
                </div>
                
                <div className="space-y-6">
                    <InputField icon={<Key />} type="password" ph="SOVEREIGN_KEY" val={sovereignKey} setVal={setSovereignKey} />
                    <InputField icon={<Layers />} type="text" ph="12_WORD_SEED_PHRASE" val={seedPhrase} setVal={setSeedPhrase} />
                </div>

                <button onClick={unlockBastion} className="w-full bg-blue-500 text-white py-6 rounded-[32px] font-black uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all shadow-[0_0_80px_rgba(59,130,246,0.3)]">
                    Activate Defense V16
                </button>
            </motion.div>
        </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ${godMode ? 'bg-zinc-50' : 'bg-[#000]'} text-zinc-900 overflow-x-hidden relative`}>
      <NeuralBackground />
      <NotificationToast notifications={notifications} onClose={removeNotification} />
      
      <header className={`sticky top-6 z-50 h-24 flex items-center justify-between px-8 bg-white/40 backdrop-blur-3xl border border-white/80 mx-6 rounded-[40px] shadow-2xl transition-all duration-1000`}>
        <div className="flex items-center gap-6">
            <Menu className="w-8 h-8 text-blue-500" onClick={() => setSidebarOpen(true)} />
            <div onClick={() => setView('list')} className="cursor-pointer">
                <h1 className="text-3xl font-black tracking-tighter italic text-zinc-900 flex items-center gap-3">
                    BASTIÓN_V16 <Eye className="w-8 h-8 text-blue-500 animate-pulse" />
                </h1>
                <div className="flex items-center gap-2">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span className="text-[8px] font-black uppercase text-blue-600/80 tracking-[1.4em]">NEURAL_HEARTBEAT_ACTIVE_99.9%</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col items-end px-4 border-r border-zinc-200">
                <span className="text-[8px] font-black uppercase text-blue-500">Security Pulse</span>
                <span className="text-sm font-black text-zinc-900">ENCRYPTED</span>
            </div>
            <button className="w-14 h-14 rounded-3xl bg-zinc-900 text-white flex items-center justify-center shadow-xl">
                <ShieldCheck className="w-8 h-8" />
            </button>
        </div>
      </header>

      <main className="p-6 max-w-lg mx-auto pb-44 pt-12 relative z-10">
        <AnimatePresence mode="wait">
          {view === 'list' ? (
                <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                     <div className="grid grid-cols-1 gap-6">
                        <h2 className="text-2xl font-black italic px-4">Intrusion Logs</h2>
                        {logs.slice(0, 3).map((l, i) => (
                            <div key={i} className="bg-white p-8 rounded-[48px] border border-zinc-100 flex justify-between items-center shadow-sm">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-zinc-400 uppercase">{l.time}</p>
                                    <p className="font-black text-zinc-900">{l.ip}</p>
                                </div>
                                <span className={`px-4 py-1 rounded-full text-[10px] font-black ${l.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>{l.status}</span>
                            </div>
                        ))}
                    </div>
                    <MatchList 
                        fixtures={fixtures} 
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                        onSelect={(id) => { setSelectedFixture(fixtures.find(f => f.id === id)); setView('detail'); }} 
                    />
                </motion.div>
          ) : view === 'odds' ? (
                <motion.div key="odds" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <OddsExplorer odds={odds} />
                </motion.div>
          ) : (
            <motion.div key="detail" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                <button onClick={() => setView('list')} className="text-[10px] font-black text-blue-500 uppercase flex items-center gap-3"><ChevronLeft size={18}/> Defensive Hub</button>

                <Pitch3D heatmap={[]} vectors={[]} />

                {/* Scoreboard Bastión V16 */}
                <section className="bg-white rounded-[80px] p-16 border border-zinc-100 shadow-[0_80px_150px_rgba(0,0,0,0.05)] text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-center px-4 mb-10 relative z-10">
                         <TeamHeader logo={selectedFixture?.logo_home} name={selectedFixture?.home} mode={true} />
                        <h3 className="text-9xl font-black tracking-tighter text-zinc-900 tabular-nums">{data?.score || "5-1"}</h3>
                        <TeamHeader logo={selectedFixture?.logo_away} name={selectedFixture?.away} mode={true} />
                    </div>
                    <div className="bg-blue-600 py-4 px-12 inline-block rounded-full text-[10px] font-black text-white tracking-[0.7em] shadow-xl">
                        ENCRYPTED_STREAM_V16
                    </div>
                </section>

                <div className="grid grid-cols-2 gap-8">
                     <div className="bg-white p-12 rounded-[56px] border border-zinc-100 space-y-3 shadow-sm">
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Payload Integrity</p>
                        <p className="text-4xl font-black text-zinc-900">VERIFIED</p>
                    </div>
                    <div className="bg-white p-12 rounded-[56px] border border-zinc-100 space-y-3 flex flex-col items-center justify-center shadow-sm">
                        <Activity className="w-8 h-8 text-blue-500 animate-pulse" />
                        <p className="text-[10px] font-black text-zinc-900 uppercase tracking-widest mt-2">Active Shield</p>
                    </div>
                </div>

                <section className="bg-zinc-900 rounded-[56px] p-12 text-center italic text-blue-400 font-bold text-xl leading-relaxed border-4 border-blue-500/20 shadow-2xl">
                    "{data?.bastion_shield === 'ACTIVE' ? 'Soberanía blindada. Todo el flujo de datos está bajo rotación de claves cuánticas.' : 'Sincronizando...'}"
                </section>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 inset-x-0 h-28 backdrop-blur-3xl border-t border-zinc-100 flex items-center justify-around px-10 z-50 bg-white/80">
        <TabItem icon={<Target />} label="Stream" active={view === 'list'} onClick={() => setView('list')} />
        <TabItem icon={<Shield />} label="Bastión" active={view === 'bastion'} onClick={() => setView('bastion')} />
        <TabItem icon={<Radar />} label="Radar" active={view === 'odds'} onClick={() => setView('odds')} />
      </nav>
    </div>
  );
}

function InputField({ icon, type, ph, val, setVal }: any) {
    return (
        <div className="relative">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-400/60">{icon}</div>
            <input 
                type={type} 
                placeholder={ph}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="w-full bg-white/5 border border-blue-500/20 rounded-[32px] py-6 pl-16 pr-8 text-white font-black tracking-widest focus:outline-none focus:border-blue-500/50 transition-all text-center placeholder:text-zinc-600"
            />
        </div>
    );
}

function TeamHeader({ logo, name, mode }: any) {
    return (
        <div className="text-center flex-1 space-y-5">
            <img src={logo} className={`w-28 h-28 p-6 rounded-[40px] mx-auto shadow-sm ${mode ? 'bg-zinc-50' : 'bg-white/5'}`} />
            <p className={`text-[10px] font-black uppercase tracking-widest truncate ${mode ? 'text-zinc-400' : 'text-zinc-500'}`}>{name}</p>
        </div>
    );
}

function TabItem({ icon, label, active, onClick }: any) {
    return (
        <button onClick={onClick} className={`flex flex-col items-center gap-3 transition-all ${active ? 'text-blue-500 scale-110' : 'text-zinc-400 hover:text-zinc-600'}`}>
            <div className={`p-4 rounded-[28px] transition-all ${active ? 'bg-blue-50 shadow-sm' : ''}`}>{icon}</div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">{label}</span>
        </button>
    );
}
