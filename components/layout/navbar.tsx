'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { LiveBadge } from '../ui/live-badge';
import { Logo } from '../ui/logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Trading', href: '/trading' },
    { name: 'Blog', href: '/blog' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/60 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative origin-left hover:scale-105 transition-transform duration-300">
          <Logo className="w-10 h-10 text-tcg-green drop-shadow-[0_0_12px_#39FF14]" />
          <span className="font-display text-2xl tracking-wide hidden sm:block">THE CAPITAL GURU</span>
          <LiveBadge text="" className="ml-2 px-2 py-1 hidden lg:flex" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative font-body text-[13px] font-medium uppercase tracking-widest text-white/80 hover:text-white transition-colors group"
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-tcg-green transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            );
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/dashboard" className="px-6 py-2.5 text-xs font-bold text-tcg-green border border-tcg-green/30 rounded-md tracking-widest hover:bg-tcg-green/10 transition-all uppercase">
            Dashboard
          </Link>
          <Link href="/register" className="px-6 py-2.5 text-xs font-bold text-black bg-tcg-green rounded-md tracking-widest hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] transition-all uppercase">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-tcg-black z-40 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        style={{ top: '80px' }}
      >
        <div className="p-6 flex flex-col gap-6 min-h-full border-t border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-4xl uppercase tracking-wider text-white hover:text-tcg-green transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-auto flex flex-col gap-4 pb-12">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-6 py-3 text-center text-xs font-bold text-tcg-green border border-tcg-green/30 rounded-md tracking-widest hover:bg-tcg-green/10 transition-all uppercase w-full">
              Dashboard
            </Link>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="px-6 py-3 text-center text-xs font-bold text-black bg-tcg-green rounded-md tracking-widest hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] transition-all uppercase w-full">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
