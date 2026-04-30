import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-tcg-green/30 selection:text-tcg-green">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-tcg-green opacity-[0.05] blur-[150px]" />
      </div>

      <div className="relative z-10 text-center max-w-lg px-6 flex flex-col items-center">
         <div className="font-display text-[150px] leading-none text-tcg-green shadow-tcg-green/50" style={{ textShadow: '0 0 40px rgba(57,255,20,0.3)' }}>404</div>
         <h1 className="font-display text-4xl uppercase mb-4">Market Closed For This URL</h1>
         <p className="font-body text-white/50 mb-10">We couldn&apos;t find the page you&apos;re looking for. The trend has reversed.</p>
         
         <Link href="/" className="px-8 py-4 text-xs font-bold text-black bg-tcg-green rounded-xl tracking-widest hover:scale-105 transition-all uppercase shadow-[0_0_25px_rgba(57,255,20,0.4)]">
           Return Home &rarr;
         </Link>
      </div>
    </div>
  );
}
