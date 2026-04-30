import React from 'react';
import Link from 'next/link';

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-tcg-green drop-shadow-[0_0_8px_#39FF14]">
    <rect x="12" y="8" width="8" height="12" rx="2" fill="currentColor" />
    <rect x="15" y="4" width="2" height="24" rx="1" fill="currentColor" />
    <path d="M22 14L28 8M28 8H23M28 8V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-tcg-black border-t border-tcg-green/20 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="font-display text-2xl tracking-wide">THE CAPITAL GURU</span>
            </div>
            <p className="font-body text-white/60 text-sm">
              Trade Smarter. Keep Your Edge. Institutional-grade signals for the Stock Market.
            </p>
            <p className="font-body text-amber-500/80 text-xs mt-2 border-l-2 border-amber-500 pl-3">
              <strong>Disclaimer:</strong> The Capital Guru is not SEBI-registered. All signals are for educational purposes only. Trade at your own risk.
            </p>
          </div>

          {/* Col 2: Platform */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xl tracking-wider text-white">Platform</h4>
            <ul className="flex flex-col gap-3 font-body text-sm text-white/50">
              <li><Link href="/" className="hover:text-tcg-green transition-colors">Home</Link></li>
              <li><Link href="/#features" className="hover:text-tcg-green transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-tcg-green transition-colors">Pricing</Link></li>
              <li><Link href="/trading" className="hover:text-tcg-green transition-colors">Trading Hub</Link></li>
              <li><Link href="/blog" className="hover:text-tcg-green transition-colors">Blog</Link></li>
              <li><Link href="/dashboard" className="hover:text-tcg-green transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xl tracking-wider text-white">Connect</h4>
            <ul className="flex flex-col gap-3 font-body text-sm text-white/50">
              <li><a href="#" className="hover:text-tcg-green transition-colors">Telegram Community</a></li>
              <li><a href="#" className="hover:text-tcg-green transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-tcg-green transition-colors">Twitter / X</a></li>
              <li><a href="mailto:mahir@thecapitalguru.net" className="hover:text-tcg-green transition-colors">mahir@thecapitalguru.net</a></li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xl tracking-wider text-white">Legal</h4>
            <ul className="flex flex-col gap-3 font-body text-sm text-white/50">
              <li><Link href="/disclaimer" className="hover:text-tcg-green transition-colors">Disclaimer</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-tcg-green transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-tcg-green transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-tcg-green transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-xs text-white/40 font-body">
          <p>© 2026 The Capital Guru. All rights reserved.</p>
          <p>Website: <a href="https://www.thecapitalguru.net" className="hover:text-white transition-colors">www.thecapitalguru.net</a></p>
        </div>
      </div>
    </footer>
  );
}
