'use client';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { ShieldCheck, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    termsAccepted: false
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setError('Please accept the terms and conditions.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Sign up user via Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!data.user) throw new Error('No user returned from signup');

      // 2. Create profile entry
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          email: formData.email,
          full_name: formData.fullName,
          status: 'pending',
          role: 'user',
          plan: plan || 'STARTER'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
      }

      // 3. Send Registration Email Alert
      try {
        await fetch('/api/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'registration',
            email: formData.email,
            data: { fullName: formData.fullName }
          })
        });
      } catch (emailErr) {
        console.error('Registration email failed:', emailErr);
      }

      // Success!
      localStorage.setItem('tcg_user_status', 'pending');
      
      if (plan) {
        router.push(`/checkout?plan=${plan}`);
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#050505] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative">
      {/* Header */}
      <div className="text-center mb-12">
        <Link href="/" className="inline-block hover:scale-105 transition-transform duration-300 mb-6">
          <Image 
            src="https://i.ibb.co/4RP5ZkQ6/72171-removebg-preview.png" 
            alt="The Capital Guru" 
            width={140} 
            height={140} 
            className="object-contain filter drop-shadow-[0_0_10px_rgba(57,255,20,0.2)]"
            referrerPolicy="no-referrer"
          />
        </Link>
        <h1 className="font-display text-4xl font-black uppercase mb-2 tracking-tighter">Registration</h1>
        <p className="font-body text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">Join the elite signal floor</p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleRegister}>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-xl font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="font-body font-semibold text-white/70 text-sm block mb-1.5 uppercase tracking-widest text-[11px]">Full Name</label>
          <input 
            type="text" 
            required
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 font-body text-white text-sm focus:border-tcg-green focus:outline-none transition-colors"
            placeholder="Rahul Singh"
          />
        </div>
        <div>
          <label className="font-body font-semibold text-white/70 text-sm block mb-1.5 uppercase tracking-widest text-[11px]">Email Address</label>
          <input 
            type="email" 
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 font-body text-white text-sm focus:border-tcg-green focus:outline-none transition-colors"
            placeholder="rahul@example.com"
          />
        </div>
        <div>
          <label className="font-body font-semibold text-white/70 text-sm block mb-1.5 uppercase tracking-widest text-[11px]">Password</label>
          <input 
            type="password" 
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 font-body text-white text-sm focus:border-tcg-green focus:outline-none transition-colors"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-start gap-3 py-2">
          <input 
            type="checkbox" 
            id="terms"
            checked={formData.termsAccepted}
            onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
            className="mt-1 w-4 h-4 rounded border-white/10 bg-[#0F0F0F] text-tcg-green focus:ring-tcg-green accent-tcg-green"
          />
          <label htmlFor="terms" className="text-[11px] text-white/40 font-body leading-tight">
            I AGREE TO THE <Link href="/terms" className="text-tcg-green hover:underline">TERMS OF SERVICE</Link> AND <Link href="/disclaimer" className="text-tcg-green hover:underline">LEGAL DISCLAIMER</Link>. I UNDERSTAND THAT TRADING INVOLVES RISK.
          </label>
        </div>

        <div className="pt-2">
          <button 
            type="submit"
            disabled={loading}
            className="px-6 py-4 text-xs font-bold text-black bg-tcg-green rounded-xl tracking-widest hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all uppercase mt-2 w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (plan ? 'Continue to Payment →' : 'Initialize Session →')}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center border-t border-white/5 pt-6">
        <p className="font-body text-sm text-white/50">
          Already have an account? <Link href={`/login${plan ? `?plan=${plan}` : ''}`} className="text-tcg-green hover:underline">Log in</Link>
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 mt-8 text-white/30 font-body text-xs">
        <ShieldCheck size={14} /> 256-bit Secure Encryption
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-black text-tcg-white">
      <Navbar />
      
      <section className="pt-40 pb-32 relative overflow-hidden flex justify-center items-center">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-tcg-green/5 blur-[150px] pointer-events-none"></div>

        <div className="max-w-md w-full px-6 relative z-10">
          <Suspense fallback={<Loader2 className="animate-spin text-tcg-green" />}>
            <RegisterForm />
          </Suspense>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

