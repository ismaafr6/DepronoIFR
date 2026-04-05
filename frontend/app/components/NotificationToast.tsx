import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Zap } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

export function NotificationToast({ 
  notifications, 
  onClose 
}: { 
  notifications: Notification[], 
  onClose: (id: string) => void 
}) {
  return (
    <div className="fixed top-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className={`pointer-events-auto glass-ifr p-6 rounded-[32px] border border-white/20 shadow-2xl flex items-start gap-4 max-w-sm bg-white/10 backdrop-blur-3xl`}
          >
            <div className={`p-3 rounded-2xl ${n.type === 'success' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-blue-500/20 text-blue-500'}`}>
              {n.type === 'success' ? <Zap size={20} fill="currentColor" /> : <Bell size={20} />}
            </div>
            
            <div className="flex-1 space-y-1">
              <h4 className="text-sm font-black uppercase text-white tracking-widest">{n.title}</h4>
              <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">{n.message}</p>
            </div>

            <button 
              onClick={() => onClose(n.id)}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
