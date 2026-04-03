import React from 'react';

export function LineupBoard({ homeTeam, awayTeam }: { homeTeam: string, awayTeam: string }) {
  const players = [
    { top: '80%', left: '50%', name: 'Portero' },
    { top: '60%', left: '20%', name: 'Lat. Izq' },
    { top: '60%', left: '40%', name: 'Central' },
    { top: '60%', left: '60%', name: 'Central' },
    { top: '60%', left: '80%', name: 'Lat. Der' },
    { top: '35%', left: '30%', name: 'MC' },
    { top: '35%', left: '50%', name: 'MC' },
    { top: '35%', left: '70%', name: 'MC' },
    { top: '15%', left: '20%', name: 'Ext. Izq' },
    { top: '10%', left: '50%', name: 'Delantero' },
    { top: '15%', left: '80%', name: 'Ext. Der' },
  ];

  return (
    <div className="glass rounded-[40px] p-8 space-y-6 flex flex-col">
      <h3 className="font-bold text-lg">Pizarra Táctica: {homeTeam}</h3>
      <div className="flex-1 min-h-[400px] bg-emerald-900/20 rounded-3xl border-2 border-emerald-500/20 relative overflow-hidden">
        {/* Field Markings */}
        <div className="absolute inset-x-8 inset-y-0 border-x border-white/5" />
        <div className="absolute top-1/2 inset-x-0 border-t border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/5 rounded-full" />
        
        {/* Players */}
        {players.map((p, i) => (
          <div 
            key={i} 
            style={{ top: p.top, left: p.left }} 
            className="absolute -translate-x-1/2 -translate-y-1/2 group transition-all"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-500 rounded-full border-4 border-yellow-600/30 shadow-[0_0_15px_rgba(234,179,8,0.3)] flex items-center justify-center text-[10px] font-black text-black group-hover:scale-125 cursor-help">
              {i + 1}
            </div>
            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 rounded text-[8px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {p.name}
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 text-[9px] font-bold text-zinc-400">
          Formación: <span className="text-white">4-3-3</span>
        </div>
      </div>
    </div>
  );
}
