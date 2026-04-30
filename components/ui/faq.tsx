'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "What exactly do your signals cover?",
    answer: "We specialize in high-conviction institutional setups for Equity (Cash), NSE F&O (Nifty & Bank Nifty Options), and select high-alpha swing trades. Every alert comes with specific entry zones, 3 profit targets, and a hard stop-loss to manage your risk mathematically."
  },
  {
    question: "How is delivery handled?",
    answer: "Speed is our edge. All signals are broadcasted via our private, end-to-end encrypted Telegram Alpha Channel. You receive instant push notifications the millisecond a setup is identified by our quant models and lead analyst."
  },
  {
    question: "Is there a minimum capital requirement?",
    answer: "While our strategies are institutional-grade, they are accessible. We recommend starting with at least ₹50,000 for F&O to follow proper position sizing, though equity setups can be followed with any capital."
  },
  {
    question: "What is the historical performance?",
    answer: "We maintain a strict 78%+ historical win rate with a focus on asymmetric risk-reward (Average 1:3 RR). We don't chase every candle; we wait for high-probability institutional order blocks."
  },
  {
    question: "Can I cancel my subscription any time?",
    answer: "Absolutely. We believe in value-driven retention. You can manage your access via your dashboard or contact our 24/7 support team for instant assistance."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-32 relative overflow-hidden" id="faq">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-[10px] items-center gap-2 font-black uppercase tracking-[0.3em] text-tcg-green bg-tcg-green/5 px-4 py-2 rounded-full border border-tcg-green/10 mb-6 inline-flex">
            SUPPORT TERMINAL
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Your Questions, <span className="text-white/40">Answered.</span></h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "border rounded-3xl overflow-hidden transition-all duration-500",
                openIndex === i ? "border-tcg-green/30 bg-white/[0.03] shadow-[0_0_50px_rgba(57,255,20,0.05)]" : "border-white/5 bg-transparent hover:border-white/20"
              )}
            >
              <button 
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-8 text-left group"
              >
                <span className={cn(
                  "font-display font-black text-lg md:text-xl uppercase tracking-tight transition-colors duration-300",
                  openIndex === i ? "text-tcg-green" : "text-white/80 group-hover:text-white"
                )}>{faq.question}</span>
                <div className={cn(
                  "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500",
                  openIndex === i ? "border-tcg-green bg-tcg-green text-black rotate-180" : "border-white/10 text-white/40"
                )}>
                  <ChevronDown size={20} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="p-8 pt-0 text-white/50 leading-relaxed font-body font-medium text-lg max-w-3xl">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
