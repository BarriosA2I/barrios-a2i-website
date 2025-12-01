'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// =============================================================================
// HOLOGRAPHIC CARD - S+++ PRODUCTION
// =============================================================================
// 3D tilting glass cards with holographic effects
// Touch-enabled for mobile, mouse-tracked for desktop
// =============================================================================

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: 'subtle' | 'medium' | 'intense';
  disabled?: boolean;
}

export function HolographicCard({
  children,
  className = '',
  glowColor = '#00D4FF',
  intensity = 'medium',
  disabled = false,
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth movement
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  // Intensity multipliers
  const intensityMap = {
    subtle: 0.5,
    medium: 1,
    intense: 1.5,
  };
  const mult = intensityMap[intensity];

  // Handle mouse/touch movement
  const handleMove = (clientX: number, clientY: number) => {
    if (disabled || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize to -0.5 to 0.5
    const normalizedX = ((clientX - centerX) / rect.width) * mult;
    const normalizedY = ((clientY - centerY) / rect.height) * mult;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Holographic gradient position
  const gradientX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const gradientY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleLeave}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX: disabled ? 0 : rotateX,
          rotateY: disabled ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glass card base */}
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: isHovered
              ? `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 30px ${glowColor}40`
              : '0 25px 50px -12px rgba(0,0,0,0.25)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Holographic shimmer layer */}
          <motion.div
            className="absolute inset-0 opacity-0 pointer-events-none"
            style={{
              opacity: isHovered ? 0.3 : 0,
              background: `radial-gradient(circle at ${gradientX} ${gradientY}, ${glowColor}40 0%, transparent 50%)`,
              transition: 'opacity 0.3s ease',
            }}
          />

          {/* Rainbow refraction effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{
                background: `linear-gradient(
                  135deg,
                  rgba(255,0,0,0.1) 0%,
                  rgba(255,165,0,0.1) 20%,
                  rgba(255,255,0,0.1) 40%,
                  rgba(0,255,0,0.1) 60%,
                  rgba(0,0,255,0.1) 80%,
                  rgba(238,130,238,0.1) 100%
                )`,
                opacity: 0.5,
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          )}

          {/* Content */}
          <div className="relative z-10 w-full h-full">
            {children}
          </div>

          {/* Edge highlight */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
              opacity: isHovered ? 1 : 0.5,
              transition: 'opacity 0.3s ease',
            }}
          />
        </div>

        {/* Floating reflection */}
        {isHovered && (
          <motion.div
            className="absolute -bottom-4 left-1/2 w-3/4 h-4 rounded-full pointer-events-none"
            style={{
              x: '-50%',
              background: `radial-gradient(ellipse, ${glowColor}30 0%, transparent 70%)`,
              filter: 'blur(8px)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// --- PRESET CARD STYLES ---
export function PricingCard({
  tier,
  price,
  features,
  highlighted = false,
  onSelect,
}: {
  tier: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  onSelect?: () => void;
}) {
  return (
    <HolographicCard
      className="w-full max-w-sm"
      glowColor={highlighted ? '#FFD700' : '#00D4FF'}
      intensity={highlighted ? 'intense' : 'medium'}
    >
      <div className="p-8">
        <h3 className={`text-2xl font-bold mb-2 ${highlighted ? 'text-cyber-gold' : 'text-cyber-cyan'}`}>
          {tier}
        </h3>
        <div className="text-4xl font-bold text-white mb-6">
          {price}
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-slate-300">
              <span className={highlighted ? 'text-cyber-gold' : 'text-cyber-cyan'}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={onSelect}
          className={`w-full py-3 rounded-lg font-bold uppercase tracking-wider transition-all ${
            highlighted
              ? 'bg-cyber-gold text-black hover:bg-cyber-gold/90'
              : 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan hover:bg-cyber-cyan/30'
          }`}
        >
          Select Plan
        </button>
      </div>
    </HolographicCard>
  );
}

export default HolographicCard;
