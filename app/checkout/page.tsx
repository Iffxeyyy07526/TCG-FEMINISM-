'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<{ upiId: string; qrUrl: string; maintenance: boolean; whatsappNumber?: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins
  const [loading, setLoading] = useState(true);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-tcg-green font-mono">Loading Payment Gateway...</div>;
  }

  if (settings?.maintenance || !settings?.upiId || !settings?.qrUrl) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none fixed">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="text-center bg-[#0F0F0F] p-10 rounded-2xl border border-white/10 z-10">
          <div className="text-6xl mb-6">🛠️</div>
          <h1 className="font-display text-4xl mb-4 text-tcg-green uppercase">We&apos;ll be right back</h1>
          <p className="font-body text-white/50 max-w-md mx-auto">Our payment systems are currently undergoing maintenance. Please try again in a few minutes.</p>
        </div>
      </div>
    );
  }

  const handleConfirm = async () => {
    try {
      await fetch('/api/payment-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'rahul@example.com', name: 'Rahul', plan: 'Pro' })
      });
    } catch (e) {
      console.error(e);
    }
    setPaymentConfirmed(true);
  };

  const handleWhatsApp = () => {
    const num = settings?.whatsappNumber || '919876543210';
    const msg = encodeURIComponent("Hello, I have made the payment for TCG subscription. Here is my screenshot.");
    window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
    router.push('/dashboard');
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tcg-green/5 blur-[150px] rounded-full hidden md:block"></div>
      </div>

      <div className="w-full max-w-md bg-[#0F0F0F] rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10">
        <div className="bg-tcg-green/10 p-6 text-center border-b border-tcg-green/20">
          <h1 className="font-display text-2xl text-tcg-green uppercase tracking-wide">Complete Payment</h1>
          {!paymentConfirmed && <p className="font-body text-xs text-white/70 mt-1 uppercase tracking-widest">Time Remaining: {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}</p>}
        </div>

        <div className="p-8 text-center space-y-8">
          {!paymentConfirmed ? (
            <>
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-xl">
                  {/* Using native img to bypass external domain restrictions of Next Image */}
                  <Image unoptimized src={settings?.qrUrl || ''} alt="UPI QR Code" width={200} height={200} className="rounded-lg mix-blend-multiply" />
                </div>
              </div>

              <div>
                <div className="font-body text-xs text-white/50 uppercase tracking-widest mb-2">Or Pay to UPI ID</div>
                <div className="font-mono text-lg bg-white/5 py-3 rounded-lg border border-white/10 select-all">{settings?.upiId}</div>
              </div>

              <button 
                 onClick={handleConfirm}
                 className="w-full px-6 py-4 text-xs font-bold text-black bg-tcg-green rounded-xl tracking-widest hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all uppercase mt-2">
                I have made the payment
              </button>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">✅</div>
              <h2 className="font-display text-2xl mb-4 text-white uppercase tracking-widest">Payment Initiated</h2>
              <p className="font-body text-sm text-white/70 mb-6 max-w-sm mx-auto">Please send the payment screenshot to our WhatsApp support team for quick verification.</p>
              <button 
                onClick={handleWhatsApp}
                className="w-full px-6 py-4 text-xs font-bold text-white bg-[#25D366] rounded-xl tracking-widest hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all uppercase mt-2 flex items-center justify-center gap-2">
                <span>📱</span> Send Screenshot via WhatsApp
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
