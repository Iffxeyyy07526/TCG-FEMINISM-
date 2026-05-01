'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { LayoutDashboard, Zap, Users, Settings, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Signals', href: '/dashboard/signals', icon: Zap },
    { name: 'Community', href: '/dashboard/community', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <nav className="flex-1 py-10 px-4 flex flex-col gap-2">
      <div className="px-4 mb-4">
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Navigation</span>
      </div>
      {links.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;
        
        return (
          <Link 
            key={link.name} 
            href={link.href}
            className="relative group"
          >
            {isActive && (
              <motion.div 
                layoutId="active-nav"
                className="absolute inset-0 bg-tcg-green rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.2)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            <div className={cn(
              "relative z-10 font-display text-xs px-5 py-4 rounded-xl transition-all font-black flex items-center gap-4 uppercase tracking-widest",
              isActive 
                ? 'text-black' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
            )}>
              <Icon size={18} className={cn(isActive ? "text-black" : "text-tcg-green/40 group-hover:text-tcg-green transition-colors")} />
              <span className="flex-1">{link.name}</span>
              {isActive && <ArrowUpRight size={14} className="opacity-50" />}
            </div>
          </Link>
        )
      })}
    </nav>
  );
}
