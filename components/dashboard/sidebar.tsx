'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Overview', href: '/dashboard' },
    { name: 'Signals', href: '/dashboard/signals' },
    { name: 'Community', href: '/dashboard/community' },
    { name: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link 
            key={link.name} 
            href={link.href}
            className={`font-body text-sm px-4 py-3 rounded-xl transition-all font-medium flex items-center justify-between ${
              isActive 
                ? 'bg-tcg-green text-black shadow-[0_0_15px_rgba(57,255,20,0.3)] scale-[1.02]' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {link.name}
            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-black/50" />}
          </Link>
        )
      })}
    </nav>
  );
}
