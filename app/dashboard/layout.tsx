'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Logo } from '@/components/ui/logo';
import { useProfile } from '@/hooks/use-profile';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useProfile();
  const pathname = usePathname();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || 'TR';
  };

  const getPlanLabel = (plan: string) => {
    switch (plan?.toLowerCase()) {
      case 'starter': return 'STARTER MEMBER';
      case 'pro': return 'PRO MEMBER';
      case 'elite': return 'ELITE MEMBER';
      default: return 'FREE USER';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan?.toLowerCase()) {
      case 'starter': return 'text-gray-400';
      case 'pro': return 'text-tcg-green';
      case 'elite': return 'text-yellow-500';
      default: return 'text-white/40';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-tcg-green font-display text-4xl font-black italic tracking-tighter"
        >
          TCG
        </motion.div>
        <Loader2 className="animate-spin text-tcg-green/50" size={24} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row relative overflow-hidden">
      {/* Background FX - Improved with dynamic mesh gradient look */}
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div 
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full opacity-[0.1] blur-[150px]"
          style={{ background: 'radial-gradient(circle, #39FF14 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #2AABEE 0%, transparent 70%)' }}
        />
      </div>

      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-black/80 backdrop-blur-3xl border-r border-white/5 flex flex-col h-auto md:h-screen sticky top-0 z-20">
        <div className="p-8 border-b border-white/5 flex items-center gap-3">
          <Logo mode="full" className="h-9" />
        </div>

        <Sidebar />

        {/* User Card - Premium Upgrade */}
        <div className="p-6 border-t border-white/5 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative"
          >
            {/* Gradient Glow Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-tcg-green/50 to-tcg-green/10 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-[#0A0A0A] border border-white/5 rounded-2xl p-4 flex items-center gap-4 shadow-2xl transition-all duration-300 group-hover:bg-[#111]">
              {/* Avatar with Initials and Pulse */}
              <div className="relative">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-12 h-12 rounded-xl bg-tcg-green text-black flex items-center justify-center font-display text-xl font-black shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                >
                  {getInitials(profile?.full_name || 'Trader')}
                </motion.div>
                {/* Status Indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-black flex items-center justify-center">
                  <div className={`w-2.5 h-2.5 rounded-full ${profile?.status === 'approved' ? 'bg-tcg-green animate-pulse shadow-[0_0_8px_#39FF14]' : 'bg-yellow-500'}`} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-display text-sm font-black text-white truncate uppercase tracking-tight">
                  {profile?.full_name || 'Trader'}
                </div>
                <div className={`font-mono text-[9px] font-black tracking-[0.1em] uppercase ${getPlanColor(profile?.plan || '')}`}>
                  {getPlanLabel(profile?.plan || '')}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto relative z-10 scrollbar-hide">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-6 md:p-12"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
