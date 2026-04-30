'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Check if user is admin or regular user
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white font-body relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tcg-green/5 blur-[120px] pointer-events-none"></div>

      <Link href="/" className="mb-8 hover:scale-105 transition-transform duration-300 relative z-10">
        <Image 
          src="https://i.ibb.co/4RP5ZkQ6/72171-removebg-preview.png" 
          alt="The Capital Guru" 
          width={180} 
          height={180} 
          className="object-contain drop-shadow-[0_0_15px_rgba(57,255,20,0.3)]"
          referrerPolicy="no-referrer"
        />
      </Link>
      
      <div className="w-full max-w-md bg-[#050505] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative z-10 backdrop-blur-xl">
        <h1 className="font-display text-4xl font-black mb-2 uppercase tracking-tighter">Access Terminal</h1>
        <p className="text-white/30 text-[11px] font-black uppercase tracking-[0.2em] mb-10">Secure Gateway v4.2.0</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-xl font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-2">Email Identity</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-tcg-green/50 outline-none transition-all font-body"
              placeholder="operator@elite.terminal"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-white/50 mb-2">Access Key</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-tcg-green/50 outline-none transition-all font-body"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-tcg-green text-black font-display font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(57,255,20,0.2)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Authenticate →'}
          </button>
        </form>
        
        <div className="mt-8 pt-8 border-t border-white/5 text-center space-y-4">
          <p className="font-body text-sm text-white/40">
            Scanning for access? <Link href="/register" className="text-tcg-green hover:underline">Register New Node</Link>
          </p>
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">Secure Access Terminal v4.2.0</p>
        </div>
      </div>
    </div>
  );
}

