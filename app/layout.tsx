import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-display' 
});

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body' 
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono' 
});

export const metadata: Metadata = {
  title: {
    default: 'The Capital Guru | Institutional Stock Market Signals & Intelligence',
    template: '%s | The Capital Guru'
  },
  description: 'Access high-conviction, institutional-grade stock market signals. Real-time Telegram delivery for Equity, F&O, and Nifty setups. Trade with the Guru edge.',
  keywords: ['stock market signals', 'nifty signals', 'bank nifty signals', 'trading signals telegram', 'institutional trading', 'equity research', 'option buying signals', 'the capital guru'],
  authors: [{ name: 'The Capital Guru' }],
  creator: 'The Capital Guru',
  publisher: 'The Capital Guru',
  verification: {
    google: 'oIHhGgwb4O-Xs9_hzmlO7RLDLfvSJAkpdZEJd-wJtAA',
  },
  openGraph: {
    title: 'THE CAPITAL GURU | Institutional Performance Signals',
    description: 'Stop chasing retail traps. Get real-time institutional-grade trading signals delivered to your Telegram.',
    url: 'https://thecapitalguru.net',
    siteName: 'The Capital Guru',
    images: [
      {
        url: 'https://i.ibb.co/WWggR5rr/header.jpg',
        width: 1200,
        height: 630,
        alt: 'The Capital Guru Intelligence Floor',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE CAPITAL GURU | Institutional Performance Signals',
    description: 'High-conviction trading signals based on institutional order flow.',
    images: ['https://i.ibb.co/WWggR5rr/header.jpg'],
  },
  alternates: {
    canonical: 'https://thecapitalguru.net',
  },
  icons: {
    icon: 'https://i.ibb.co/fYNCGR98/Favicon.jpg',
    apple: 'https://i.ibb.co/fYNCGR98/Favicon.jpg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { SebiBanner } from '@/components/ui/sebi-banner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-tcg-black text-white font-body antialiased relative selection:bg-tcg-green/30 selection:text-tcg-green">
        <SebiBanner />
        {children}
      </body>
    </html>
  );
}
