'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'pro';
  
  const [settings, setSettings] = useState<{ upiId: string; qrUrl: string; maintenance: boolean; whatsappNumber?: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins
  const [loading, setLoading] = useState(true);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function initCheckout() {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (!currentUser) {
            router.push('/login?redirect=/checkout');
            return;
        }
        setUser(currentUser);

        // Fetch settings from API (or DB directly)
        try {
            const res = await fetch('/api/settings');
            const data = await res.json();
            setSettings(data);
        } catch (e) {
            console.error('Settings fetch error:', e);
            // Fallback for demo if API fails
            setSettings({ upiId: 'mahir@okaxis', qrUrl: 'https://i.ibb.co/S7mZ5dC/qr.png', maintenance: false, whatsappNumber: '919876543210' });
        }
        setLoading(false);
    }
    initCheckout();
  }, [router]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (loading) {
    return <div className="min-h-screen bg-black flex flex-col items-center justify-center text-tcg-green font-mono">
      <Loader2 className="animate-spin mb-4" size={48} />
      <p className="uppercase tracking-widest text-[10px] font-black">Initializing Gateway...</p>
    </div>;
  }

  if (settings?.maintenance || !settings?.upiId) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white p-6 relative overflow-hidden text-center">
        <div className="bg-[#0F0F0F] p-12 rounded-3xl border border-white/10 z-10 max-w-sm">
          <div className="text-6xl mb-6">🛠️</div>
          <h1 className="font-display text-4xl mb-4 text-tcg-green uppercase tracking-tighter">Maintenance</h1>
          <p className="font-body text-white/50 text-sm">Payment systems are updating. Contact support via WhatsApp for manual override.</p>
        </div>
      </div>
    );
  }

  const handleConfirm = async () => {
    if (!user) return;
    
    // In a real app, you'd ask for UTR here. For this flow, we'll just log the attempt.
    setPaymentConfirmed(true);
  };

  const handleWhatsApp = () => {
    const num = settings?.whatsappNumber || '919876543210';
    const msg = encodeURIComponent(`Hello Mahir, I have just made the payment for the ${plan} plan (User: ${user.email}). Please verify my access.`);
    window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
    router.push('/dashboard');
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tcg-green/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md bg-[#0F0F0F] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden relative z-10">
        <div className="bg-tcg-green/10 p-8 text-center border-b border-tcg-green/20">
          <h1 className="font-display text-3xl text-tcg-green uppercase tracking-tighter">Secure <br/> Payment</h1>
          {!paymentConfirmed && (
            <div className="mt-4 inline-flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/5">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]"></div>
                <span className="font-mono text-xs text-white/70">Session Expires: {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}</span>
            </div>
          )}
        </div>

        <div className="p-10 text-center space-y-8">
          {!paymentConfirmed ? (
            <>
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <Image unoptimized src={settings?.qrUrl || 'https://i.ibb.co/S7mZ5dC/qr.png'} alt="UPI QR Code" width={200} height={200} className="rounded-lg mix-blend-multiply" />
                  </div>
                  <p className="font-body text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">Scan with any UPI App</p>
                </div>

                <div className="relative group">
                  <div className="font-body text-[10px] text-white/30 uppercase tracking-widest mb-3 font-black">Or Direct Entry</div>
                  <div className="font-mono text-base bg-white/[0.03] py-4 rounded-xl border border-white/5 transition-all group-hover:border-tcg-green/30 select-all text-tcg-green font-bold">
                    {settings?.upiId}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <button 
                  onClick={handleConfirm}
                  className="w-full py-5 text-sm font-black text-black bg-tcg-green rounded-xl tracking-widest hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all uppercase">
                  Verify Transaction
                </button>
                <Link href="/pricing" className="block text-[10px] uppercase tracking-widest font-black text-white/20 hover:text-white transition-colors">
                  Change Access Plan
                </Link>
              </div>
            </>
          ) : (
            <div className="animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-tcg-green/10 rounded-full flex items-center justify-center text-tcg-green mx-auto mb-6 shadow-[0_0_30px_rgba(57,255,20,0.1)]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="font-display text-4xl mb-4 text-white uppercase tracking-tighter leading-none">Awaiting <br/> Signal.</h2>
              <p className="font-body text-sm text-white/40 mb-10 max-w-xs mx-auto leading-relaxed">
                Transaction initiated. Send the receipt snapshot to Mahir via WhatsApp for priority account unlocking.
              </p>
              <button 
                onClick={handleWhatsApp}
                className="w-full py-5 text-sm font-black text-white bg-[#25D366] rounded-xl tracking-widest hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all uppercase flex items-center justify-center gap-3">
                <span>📱</span> Push Receipts Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-tcg-green font-mono">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="uppercase tracking-widest text-[10px] font-black">Initializing Secure Frame...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}

