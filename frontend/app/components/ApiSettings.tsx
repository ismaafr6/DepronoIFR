import React, { useState } from 'react';

export function ApiSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const saveKey = () => {
    localStorage.setItem("RAPIDAPI_KEY", apiKey);
    setIsOpen(false);
    alert("Clave guardada con éxito. Reinicia la simulación para usar datos reales.");
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
      >
        <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="glass w-full max-w-md rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Configuración de API</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Introduce tu clave de **API-Football (RapidAPI)** para activar el modo de datos reales en vivo.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">RapidAPI Key</label>
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="x-rapidapi-key..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={() => setIsOpen(false)} className="flex-1 py-3 text-sm font-bold text-zinc-400 hover:text-white transition-all">Cancelar</button>
              <button 
                onClick={saveKey}
                className="flex-1 bg-emerald-500 text-black py-3 rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
              >
                Guardar Configuración
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
