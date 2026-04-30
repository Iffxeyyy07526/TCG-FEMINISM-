import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as motion from 'motion/react-client';

const testimonials = [
  {
    name: "Mohit Deshmukh",
    role: "Full-Time Trader",
    quote: "The Capital Guru signals are actually realistic. I've seen groups posting 'jackpot' signals that hit SL in 2 mins. Here, the setups are planned perfectly with institutional order blocks. My month-on-month consistency has spiked 40%.",
    avatar: "MD",
    size: "large"
  },
  {
    name: "Neha Kapoor",
    role: "Option Buyer",
    quote: "Consistency is key in Nifty. The target trailing instructions help me extract the maximum from every move. Best decision for my portfolio.",
    avatar: "NK",
    size: "small"
  },
  {
    name: "Arjun Reddy",
    role: "Wealth Manager",
    quote: "Institutional-grade flow analysis is evident in the Bank Nifty setups. Highly professional and timely deliveries every single day.",
    avatar: "AR",
    size: "small"
  },
  {
    name: "Sanjay Gupta",
    role: "Professional Trader",
    quote: "Unlike retail groups, TG focuses on RR ratios. Even with a few SLs, the big target hits keep the curve moving up. Total alpha floor.",
    avatar: "SG",
    size: "medium"
  }
];

export function Testimonials() {
  return (
    <section className="py-32 relative" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-[10px] items-center gap-2 font-black uppercase tracking-[0.3em] text-tcg-green mb-6 block">
            ELITE NETWORK FEEDBACK
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Trusted By <span className="text-white/40">Professionals.</span></h2>
          <p className="text-white/30 max-w-2xl mx-auto text-lg font-body font-medium">Join 2,400+ active traders who leverage institutional research for daily market edge.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "bg-[#050505] border border-white/5 p-10 rounded-[2rem] relative group hover:border-tcg-green/20 transition-all duration-700 flex flex-col justify-between",
                t.size === 'large' && "lg:col-span-2",
                t.size === 'medium' && "lg:col-span-1"
              )}
            >
              <div>
                <div className="flex gap-1 mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-tcg-green text-tcg-green" />
                  ))}
                </div>
                <p className={cn(
                  "text-white/70 italic mb-12 font-body leading-relaxed group-hover:text-white transition-colors",
                  t.size === 'large' ? "text-xl md:text-2xl font-bold" : "text-lg font-medium"
                )}>&quot;{t.quote}&quot;</p>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-tcg-green/5 border border-tcg-green/10 flex items-center justify-center font-display text-tcg-green font-black text-xl group-hover:bg-tcg-green group-hover:text-black transition-all duration-500">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-display font-black text-white text-xl uppercase tracking-tight">{t.name}</div>
                  <div className="text-tcg-green/50 text-[10px] font-black font-body tracking-[0.2em] uppercase">{t.role}</div>
                </div>
              </div>

              {/* Decorative mark */}
              <div className="absolute top-10 right-10 text-6xl text-white/[0.02] font-black group-hover:text-tcg-green/[0.03] transition-colors pointer-events-none">
                &rdquo;
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
