import React from 'react';
import Link from 'next/link';
import { Logo } from '../ui/logo';

export function Footer() {
  return (
    <footer className="bg-tcg-black border-t border-tcg-green/20 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Logo mode="full" className="h-10" src="https://i.ibb.co/Y7MjtDMy/footer.jpg" />
            </Link>
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
            <h4 className="font-display text-xl tracking-wider text-white uppercase font-bold">Connect</h4>
            <ul className="flex flex-col gap-3 font-body text-sm text-white/50">
              <li><a href="https://t.me/TheCapitalGuruSupport" target="_blank" rel="noopener noreferrer" className="hover:text-tcg-green transition-colors flex items-center gap-2 group"><span className="group-hover:translate-x-1 transition-transform">💬</span> Telegram Support</a></li>
              <li><a href="https://www.instagram.com/thecapitalguru" target="_blank" rel="noopener noreferrer" className="hover:text-tcg-green transition-colors">Instagram</a></li>
              <li><a href="https://x.com/thecapitalguru" target="_blank" rel="noopener noreferrer" className="hover:text-tcg-green transition-colors">Twitter / X</a></li>
              <li><a href="mailto:support@thecapitalguru.net" className="hover:text-tcg-green transition-colors">support@thecapitalguru.net</a></li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xl tracking-wider text-white">Legal</h4>
            <ul className="flex flex-col gap-3 font-body text-sm text-white/50">
              <li><Link href="/disclaimer" className="hover:text-tcg-green transition-colors">Disclaimer</Link></li>
              <li><Link href="/terms" className="hover:text-tcg-green transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-tcg-green transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-tcg-green transition-colors">Refund Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-tcg-green transition-colors">Cookies Notice</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/5 text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">
          <div className="flex items-center gap-8">
            <p>© 2026 The Capital Guru</p>
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-tcg-green shadow-[0_0_8px_#39FF14]"></span>
              SECURE GLOBAL GATEWAY
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-tcg-green shadow-[0_0_8px_#39FF14]"></span>
              SSL ENCRYPTED
            </div>
          </div>
          <p>Managed by <a href="https://www.thecapitalguru.net" className="text-tcg-green/60 hover:text-tcg-green transition-colors">The Capital Guru Enterprise</a></p>
        </div>
      </div>
    </footer>
  );
}
