'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Logo } from '@/components/ui/logo';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simple localStorage auth check
    const auth = localStorage.getItem('tcg_auth');
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, [router]);

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center font-display text-tcg-green animate-pulse">TCG LOADING...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-tcg-green opacity-[0.08] blur-[120px]" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-tcg-green opacity-[0.05] blur-[100px]" />
      </div>

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col h-auto md:h-screen sticky top-0 z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <Logo mode="full" className="h-8" />
        </div>

        <Sidebar />

        <div className="p-6 border-t border-white/5">
          <div className="bg-[#0F0F0F] border border-white/10 rounded-xl p-3 flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-full bg-tcg-green text-black flex items-center justify-center font-display text-lg shadow-[0_0_10px_rgba(57,255,20,0.4)]">RS</div>
            <div>
              <div className="font-body text-xs font-bold text-white">Rahul Singh</div>
              <div className="font-body text-[10px] text-tcg-green font-bold tracking-widest uppercase">Pro Member</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto relative z-10">
        {children}
      </main>
    </div>
  );
}
