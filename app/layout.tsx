import type { Metadata } from 'next';
import { Bebas_Neue, Montserrat, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-display' 
});

const montserrat = Montserrat({ 
  weight: ['300', '400', '500', '600', '700', '800'], 
  subsets: ['latin'], 
  variable: '--font-body' 
});

const jetbrainsMono = JetBrains_Mono({ 
  weight: ['400', '500', '600', '700'], 
  subsets: ['latin'], 
  variable: '--font-mono' 
});

export const metadata: Metadata = {
  title: 'The Capital Guru | India\'s #1 Stock Market Signals',
  description: 'Get institutional-grade stock market trading signals with a proven track record. Real-time Telegram delivery for advanced trading.',
  verification: {
    google: 'oIHhGgwb4O-Xs9_hzmlO7RLDLfvSJAkpdZEJd-wJtAA',
  },
  openGraph: {
    title: 'The Capital Guru | India\'s #1 Stock Market Signals',
    description: 'Get institutional-grade stock market trading signals with a proven track record. Real-time Telegram delivery.',
    url: 'https://thecapitalguru.net',
    siteName: 'The Capital Guru',
    images: [
      {
        url: 'https://thecapitalguru.net/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Capital Guru Preview',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Capital Guru | India\'s #1 Stock Market Signals',
    description: 'Institutional-grade Stock Market signals.',
    images: ['https://thecapitalguru.net/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://thecapitalguru.net',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${montserrat.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-tcg-black text-tcg-white font-body antialiased relative selection:bg-tcg-green/30 selection:text-tcg-green">
        {children}
      </body>
    </html>
  );
}
