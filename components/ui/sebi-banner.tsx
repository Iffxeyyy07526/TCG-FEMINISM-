'use client';

import { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export function SebiBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkDismissed = () => {
      const isDismissed = localStorage.getItem('sebi_banner_dismissed');
      if (!isDismissed) {
        setIsVisible(true);
      }
    };
    
    // Defer to avoid cascading render lint error
    const timer = setTimeout(checkDismissed, 0);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem('sebi_banner_dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-tcg-black border-b border-tcg-green/30 px-4 py-3 md:py-2 backdrop-blur-xl animate-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="shrink-0 w-8 h-8 rounded-full bg-tcg-green/10 flex items-center justify-center text-tcg-green shadow-[0_0_15px_rgba(57,255,20,0.2)]">
            <AlertTriangle size={16} />
          </div>
          <p className="font-display text-[10px] md:text-xs font-black uppercase tracking-tight text-white/90 leading-tight">
            <span className="text-tcg-green underline decoration-tcg-green/20">Regulatory Notice:</span> The Capital Guru is <span className="text-tcg-green">NOT SEBI-registered</span>. All content is for educational purposes only. Trading involves substantial risk.
          </p>
        </div>
        <button 
          onClick={dismiss} 
          className="shrink-0 w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-white transition-colors"
          aria-label="Dismiss banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
