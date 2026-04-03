import React, { useState } from 'react';

export function AIChat({ fixtureId }: { fixtureId: number }) {
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([
    { role: 'ai', content: 'Analizador Táctico IA conectado. ¿En qué puedo fundamentar tu estrategia hoy?' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:8000/chat/${fixtureId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.answer }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', content: "Error de conexión con el motor táctico." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-6 flex flex-col h-[500px]">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        AI Tactical Assistant
      </h3>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed font-mono ${
              m.role === 'user' 
                ? 'bg-emerald-500 text-black font-bold' 
                : 'bg-zinc-900 text-emerald-400 border border-emerald-500/20'
            }`}>
              {m.role === 'ai' && <span className="mr-2 opacity-50 tracking-tighter">&gt;_</span>}
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-[10px] text-zinc-500 font-mono animate-pulse">&gt; PROCESANDO_ESTADISTICAS...</div>}
      </div>

      <div className="relative">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Pregunta sobre flancos, debilidades o probabilidades..."
          className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-xs focus:border-emerald-500 outline-none transition-all pr-16"
        />
        <button 
          onClick={sendMessage}
          className="absolute right-3 top-3 bottom-3 bg-emerald-500 text-black px-4 rounded-xl flex items-center justify-center hover:bg-emerald-400 transition-all active:scale-95 shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
