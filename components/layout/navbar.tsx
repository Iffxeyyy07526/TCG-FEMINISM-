'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { LiveBadge } from '../ui/live-badge';
import { Logo } from '../ui/logo';
import { supabase } from '@/lib/supabase';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check auth session
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setIsLoggedIn(!!session);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? 'py-4'
          : 'py-0'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-6 h-20 flex items-center justify-between transition-all duration-700 ${
        isScrolled 
          ? 'glass rounded-3xl mx-4 sm:mx-10 shadow-2xl shadow-tcg-green/5' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative origin-left hover:scale-105 transition-transform duration-300">
          <Logo mode="full" className="h-10 sm:h-12" src="https://i.ibb.co/7J5yFQ9N/72178-removebg-preview-1.png" />
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
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="px-5 py-2 text-xs font-bold text-tcg-green border border-tcg-green/30 rounded-lg tracking-widest hover:bg-tcg-green/10 transition-all uppercase">
                Dashboard
              </Link>
              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = '/';
                }}
                className="px-5 py-2 text-xs font-bold text-red-500 border border-red-500/30 rounded-lg tracking-widest hover:bg-red-500/10 transition-all uppercase"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-5 py-2 text-xs font-bold text-white/60 hover:text-white tracking-widest transition-all uppercase">
                Login
              </Link>
              <Link href="/register" className="px-6 py-2.5 text-xs font-black text-black bg-tcg-green rounded-lg tracking-tighter hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] transition-all uppercase scale-110 active:scale-100">
                JOIN NOW
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {!isLoggedIn && (
            <Link href="/register" className="px-5 py-2 text-[10px] font-black text-black bg-tcg-green rounded-lg tracking-widest uppercase shadow-[0_0_15px_rgba(57,255,20,0.3)]">
              JOIN
            </Link>
          )}
          <button
            className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-6 py-3 text-center text-xs font-bold text-tcg-green border border-tcg-green/30 rounded-md tracking-widest hover:bg-tcg-green/10 transition-all uppercase w-full">
                  Dashboard
                </Link>
                <button 
                  onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.href = '/';
                  }}
                  className="px-6 py-3 text-center text-xs font-bold text-red-500 border border-red-500/30 rounded-md tracking-widest hover:bg-red-500/10 transition-all uppercase w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 text-center text-sm font-black text-black bg-tcg-green rounded-xl tracking-widest uppercase w-full shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                  JOIN NOW
                </Link>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 text-center text-sm font-bold text-white/60 border border-white/10 rounded-xl tracking-widest uppercase w-full">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
