'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

// =============================================================================
// SCAN REVEAL - S+++ PRODUCTION
// =============================================================================
// Scroll-triggered reveal animations with military scanning effect
// Multiple modes: scan, decrypt, materialize
// =============================================================================

type RevealMode = 'scan' | 'decrypt' | 'materialize';

interface ScanRevealProps {
  children: React.ReactNode;
  mode?: RevealMode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

// --- SCAN MODE ---
// Horizontal scanning line reveals content
function ScanMode({
  children,
  delay,
  duration,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  duration: number;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setRevealed(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Content (clips as scan line passes) */}
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={revealed ? { clipPath: 'inset(0 0% 0 0)' } : {}}
        transition={{ duration, ease: 'easeOut' }}
      >
        {children}
      </motion.div>

      {/* Scan line */}
      {revealed && (
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyber-cyan to-transparent"
          initial={{ left: '0%' }}
          animate={{ left: '100%' }}
          transition={{ duration, ease: 'easeOut' }}
          style={{
            boxShadow: '0 0 20px #00D4FF, 0 0 40px #00D4FF',
          }}
        />
      )}

      {/* Grid overlay during scan */}
      {revealed && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0 }}
          transition={{ duration: duration * 0.8, delay: duration * 0.2 }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
      )}
    </div>
  );
}

// --- DECRYPT MODE ---
// Text scrambles then reveals (Matrix-style)
function DecryptMode({
  children,
  delay,
  duration,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  duration: number;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [phase, setPhase] = useState<'hidden' | 'scrambling' | 'revealed'>('hidden');

  useEffect(() => {
    if (isInView) {
      const startTimer = setTimeout(() => setPhase('scrambling'), delay * 1000);
      const revealTimer = setTimeout(() => setPhase('revealed'), (delay + duration * 0.7) * 1000);
      return () => {
        clearTimeout(startTimer);
        clearTimeout(revealTimer);
      };
    }
  }, [isInView, delay, duration]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Hidden state */}
      {phase === 'hidden' && (
        <div className="opacity-0">{children}</div>
      )}

      {/* Scrambling state */}
      {phase === 'scrambling' && (
        <motion.div
          className="font-mono text-cyber-cyan"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
          }}
        >
          <ScrambleText duration={duration * 0.7}>{children}</ScrambleText>
        </motion.div>
      )}

      {/* Revealed state */}
      {phase === 'revealed' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

// Helper: Scramble text effect
function ScrambleText({
  children,
  duration,
}: {
  children: React.ReactNode;
  duration: number;
}) {
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEF';
  const [scrambled, setScrambled] = useState('');
  const originalText = typeof children === 'string' ? children : '';

  useEffect(() => {
    let frame = 0;
    const totalFrames = duration * 60; // 60fps

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      let result = '';
      for (let i = 0; i < originalText.length; i++) {
        if (i / originalText.length < progress) {
          result += originalText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setScrambled(result);

      if (frame >= totalFrames) {
        clearInterval(interval);
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [originalText, duration]);

  return <span>{scrambled || originalText}</span>;
}

// --- MATERIALIZE MODE ---
// Particles coalesce into content
function MaterializeMode({
  children,
  delay,
  duration,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  duration: number;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: duration * 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Particle burst effect */}
      {isInView && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: duration * 0.5, delay }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyber-cyan rounded-full"
              style={{
                left: `${50 + (Math.random() - 0.5) * 100}%`,
                top: `${50 + (Math.random() - 0.5) * 100}%`,
              }}
              initial={{
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                opacity: 1,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: 0,
              }}
              transition={{
                duration: duration * 0.4,
                delay: delay + Math.random() * 0.2,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Content */}
      <motion.div variants={itemVariants}>{children}</motion.div>
    </motion.div>
  );
}

// --- MAIN COMPONENT ---
export function ScanReveal({
  children,
  mode = 'scan',
  delay = 0,
  duration = 1,
  className = '',
  once = true,
  threshold = 0.3,
}: ScanRevealProps) {
  const props = { children, delay, duration, className };

  switch (mode) {
    case 'scan':
      return <ScanMode {...props} />;
    case 'decrypt':
      return <DecryptMode {...props} />;
    case 'materialize':
      return <MaterializeMode {...props} />;
    default:
      return <ScanMode {...props} />;
  }
}

// --- CONVENIENCE WRAPPERS ---
export function ScanRevealText({
  children,
  className = '',
  ...props
}: Omit<ScanRevealProps, 'children'> & { children: string }) {
  return (
    <ScanReveal mode="decrypt" className={className} {...props}>
      {children}
    </ScanReveal>
  );
}

export function ScanRevealSection({
  children,
  className = '',
  ...props
}: ScanRevealProps) {
  return (
    <ScanReveal mode="scan" className={className} {...props}>
      {children}
    </ScanReveal>
  );
}

export default ScanReveal;
