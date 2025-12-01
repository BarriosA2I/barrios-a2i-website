'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

// =============================================================================
// REALITY MASK - S+++ PRODUCTION
// =============================================================================
// Hero text that clips through video/GIF creating cinematic depth
// Military-grade typography with glitch effects
// =============================================================================

interface RealityMaskProps {
  text: string;
  subtext?: string;
  videoSrc?: string;
  gifSrc?: string;
  className?: string;
  glitchOnHover?: boolean;
  scanLine?: boolean;
}

export function RealityMask({
  text,
  subtext,
  videoSrc,
  gifSrc,
  className = '',
  glitchOnHover = true,
  scanLine = true,
}: RealityMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const glitchControls = useAnimation();

  // Glitch effect on hover
  useEffect(() => {
    if (isHovered && glitchOnHover) {
      const glitchSequence = async () => {
        await glitchControls.start({
          x: [0, -5, 5, -3, 3, 0],
          transition: { duration: 0.3 },
        });
      };
      glitchSequence();
    }
  }, [isHovered, glitchOnHover, glitchControls]);

  const mediaSrc = videoSrc || gifSrc;
  const isVideo = !!videoSrc;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background media layer */}
      <div className="absolute inset-0 z-0">
        {mediaSrc && (
          isVideo ? (
            <video
              src={mediaSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={mediaSrc}
              alt=""
              className="w-full h-full object-cover"
            />
          )
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy-deep/60 to-navy-deep" />
      </div>

      {/* Masked text container */}
      <motion.div
        animate={glitchControls}
        className="relative z-10"
      >
        {/* Main headline with mask */}
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter"
          style={{
            background: mediaSrc
              ? `url(${mediaSrc}) center/cover`
              : 'linear-gradient(135deg, #00D4FF 0%, #00FF88 50%, #FFD700 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {text}
        </h1>

        {/* Subtext */}
        {subtext && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-xl md:text-2xl text-slate-300 font-light tracking-wide"
          >
            {subtext}
          </motion.p>
        )}
      </motion.div>

      {/* Scan line effect */}
      {scanLine && (
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50 z-20"
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Glitch overlay on hover */}
      {isHovered && glitchOnHover && (
        <>
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.3) 50%, transparent 100%)',
            }}
          />
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none mix-blend-screen"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.03) 2px, rgba(0,212,255,0.03) 4px)',
            }}
          />
        </>
      )}
    </div>
  );
}

export default RealityMask;
