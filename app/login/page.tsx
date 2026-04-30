import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-tcg-black text-tcg-white">
      <Navbar />
      
      <section className="pt-40 pb-24 relative overflow-hidden flex justify-center items-center">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-tcg-green/10 blur-[150px] pointer-events-none"></div>

        <div className="max-w-md w-full px-6 relative z-10">
          <div className="card-premium p-8 relative">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="w-12 h-12 rounded bg-tcg-green flex items-center justify-center text-black font-display font-bold text-3xl mx-auto mb-4 shadow-[0_0_20px_rgba(57,255,20,0.5)]">CG</div>
              <h1 className="font-display text-4xl uppercase mb-2">Welcome Back</h1>
              <p className="font-body text-sm text-white/50">Log in to access your dashboard</p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              <div>
                <label className="font-body font-semibold text-white/70 text-sm block mb-1.5 uppercase tracking-widest text-[11px]">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 font-body text-white text-sm focus:border-tcg-green focus:outline-none transition-colors"
                  placeholder="rahul@example.com"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-body font-semibold text-white/70 text-sm block uppercase tracking-widest text-[11px]">Password</label>
                  <Link href="#" className="font-body text-[11px] text-tcg-green hover:underline">Forgot?</Link>
                </div>
                <input 
                  type="password" 
                  className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 font-body text-white text-sm focus:border-tcg-green focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-2">
                <Link href="/dashboard" className="px-6 py-4 text-xs font-bold text-black bg-tcg-green rounded-xl tracking-widest hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all uppercase mt-2 flex items-center justify-center w-full">
                  Log In
                </Link>
              </div>
            </form>

            <div className="mt-8 text-center border-t border-white/5 pt-6">
              <p className="font-body text-sm text-white/50">
                Don&apos;t have an account? <Link href="/pricing" className="text-tcg-green hover:underline hover:text-white transition-colors">View Plans</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
