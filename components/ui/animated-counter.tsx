'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useAnimation, animate } from 'motion/react';

export function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 1.2, 
  format = 'default',
  className = "" 
}: { 
  from?: number, 
  to: number, 
  duration?: number, 
  format?: 'default' | 'percent' | 'plus' | 'currency',
  className?: string 
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-50px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    let controls: { stop: () => void } | undefined;
    
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      // Small delay to ensure component is fully mounted and visible
      const timeout = setTimeout(() => {
        controls = animate(from, to, {
          duration,
          ease: 'easeOut',
          onUpdate(value) {
            if (nodeRef.current) {
              let formattedStr = '';
              
              if (format === 'percent') {
                formattedStr = `${value.toFixed(1)}%`;
              } else if (format === 'plus') {
                formattedStr = `${Math.floor(value).toLocaleString()}+`;
              } else if (format === 'currency') {
                formattedStr = Math.floor(value).toLocaleString();
              } else {
                formattedStr = Math.floor(value).toString();
              }
              
              nodeRef.current.textContent = formattedStr;
            }
          },
        });
      }, 100);

      return () => {
        clearTimeout(timeout);
        controls?.stop();
      };
    }
  }, [isInView, from, to, duration, format]);

  const initialFormat = () => {
    if (format === 'percent') return `${from.toFixed(1)}%`;
    if (format === 'plus') return `${Math.floor(from)}+`;
    if (format === 'currency') return Math.floor(from).toLocaleString();
    return Math.floor(from).toString();
  };

  return (
    <span ref={nodeRef} className={className}>
      {initialFormat()}
    </span>
  );
}
