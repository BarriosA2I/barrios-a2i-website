'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

// =============================================================================
// VIDEO PORTAL CARD - S+++ PRODUCTION
// =============================================================================
// 3D holographic video cards with mouse-tracking effects
// For use with Kling AI generated background loops
// =============================================================================

interface VideoPortalCardProps {
  title: string;
  subtitle: string;
  videoUrl: string;
  fallbackImage?: string;
  icon: React.ReactNode;
  accentColor?: 'cyan' | 'amber' | 'emerald' | 'purple' | 'rose';
  statusText?: string;
  badge?: string;
  onClick?: () => void;
  className?: string;
}

// =============================================================================
// COLOR CONFIGURATIONS
// =============================================================================

const ACCENT_COLORS = {
  cyan: {
    primary: 'rgb(6, 182, 212)',
    glow: 'rgba(6, 182, 212, 0.3)',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500',
    hover: 'group-hover:text-cyan-400',
    iconHover: 'group-hover:bg-cyan-500',
    progress: 'bg-cyan-500',
  },
  amber: {
    primary: 'rgb(245, 158, 11)',
    glow: 'rgba(245, 158, 11, 0.3)',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    bg: 'bg-amber-500',
    hover: 'group-hover:text-amber-400',
    iconHover: 'group-hover:bg-amber-500',
    progress: 'bg-amber-500',
  },
  emerald: {
    primary: 'rgb(16, 185, 129)',
    glow: 'rgba(16, 185, 129, 0.3)',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500',
    hover: 'group-hover:text-emerald-400',
    iconHover: 'group-hover:bg-emerald-500',
    progress: 'bg-emerald-500',
  },
  purple: {
    primary: 'rgb(168, 85, 247)',
    glow: 'rgba(168, 85, 247, 0.3)',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    bg: 'bg-purple-500',
    hover: 'group-hover:text-purple-400',
    iconHover: 'group-hover:bg-purple-500',
    progress: 'bg-purple-500',
  },
  rose: {
    primary: 'rgb(244, 63, 94)',
    glow: 'rgba(244, 63, 94, 0.3)',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    bg: 'bg-rose-500',
    hover: 'group-hover:text-rose-400',
    iconHover: 'group-hover:bg-rose-500',
    progress: 'bg-rose-500',
  },
};

// =============================================================================
// COMPONENT
// =============================================================================

export const VideoPortalCard: React.FC<VideoPortalCardProps> = ({
  title,
  subtitle,
  videoUrl,
  fallbackImage,
  icon,
  accentColor = 'cyan',
  statusText = 'SYS.ACTIVE',
  badge,
  onClick,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const colors = ACCENT_COLORS[accentColor];

  // 3D Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth movement
  const xSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 25 });
  const mouseXSpring = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 500, damping: 30 });
  
  // Transform template for 3D effect
  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg) translateZ(10px)`;
  
  // Light position following mouse
  const lightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseXSpring}px ${mouseYSpring}px, ${colors.glow}, transparent 40%)`;

  // Handle mouse movement for tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    // Calculate tilt angles
    const xPct = (mouseYPos / height - 0.5) * 12 * -1;
    const yPct = (mouseXPos / width - 0.5) * 12;
    
    x.set(xPct);
    y.set(yPct);
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Video loading handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => setVideoLoaded(true);
    const handleError = () => setVideoError(true);

    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <motion.div
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      className={`
        group relative h-[420px] w-full rounded-2xl bg-[#0a0a0f] overflow-hidden 
        border border-white/10 shadow-2xl transition-all duration-500
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* LAYER 1: Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Video Element */}
        {!videoError && videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className={`
              h-full w-full object-cover
              opacity-60 group-hover:opacity-80
              transition-all duration-700
              grayscale-[30%] group-hover:grayscale-0
              scale-105 group-hover:scale-100
              ${videoLoaded ? '' : 'invisible'}
            `}
          />
        )}
        
        {/* Fallback Image */}
        {(videoError || !videoLoaded) && fallbackImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-700"
            style={{ backgroundImage: `url(${fallbackImage})` }}
          />
        )}

        {/* Animated Gradient Fallback */}
        {(videoError || !videoUrl) && !fallbackImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent animate-pulse" />
          </div>
        )}

        {/* Scanline Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background: `
              linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.15) 50%),
              linear-gradient(90deg, rgba(255,0,0,0.03), rgba(0,255,0,0.02), rgba(0,0,255,0.03))
            `,
            backgroundSize: '100% 2px, 3px 100%',
          }}
        />

        {/* Gradient Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent" />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* LAYER 2: Mouse-Following Light */}
      <motion.div
        className="absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: lightBackground }}
      />

      {/* LAYER 3: Content (HUD Style) */}
      <div className="relative z-10 h-full p-8 flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          {/* Icon Container */}
          <motion.div 
            className={`
              p-3.5 rounded-xl bg-white/5 border border-white/10 
              backdrop-blur-md ${colors.text}
              group-hover:text-white ${colors.iconHover}
              transition-all duration-300 shadow-lg
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {icon}
          </motion.div>
          
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            {badge && (
              <span className={`
                px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                ${colors.bg} text-black
              `}>
                {badge}
              </span>
            )}
            <div className={`
              flex items-center gap-1.5 text-[10px] font-mono 
              text-white/30 ${colors.hover} transition-colors
            `}>
              <span className={`w-1.5 h-1.5 rounded-full ${colors.bg} animate-pulse`} />
              {statusText}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div>
          {/* Title */}
          <motion.h3 
            className="text-2xl font-bold text-white mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            {title}
          </motion.h3>
          
          {/* Subtitle */}
          <motion.p 
            className="text-slate-400 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 transform translate-y-4 group-hover:translate-y-0 line-clamp-3"
          >
            {subtitle}
          </motion.p>

          {/* Progress Bar */}
          <div className="w-full h-0.5 bg-white/10 mt-6 overflow-hidden rounded-full">
            <motion.div 
              className={`h-full ${colors.progress}`}
              initial={{ width: 0 }}
              animate={{ width: isHovered ? '100%' : '0%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>

          {/* Corner Dots */}
          <div className="absolute bottom-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-1 h-1 rounded-full ${colors.bg}`}
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* LAYER 4: Border Glow */}
      <div className={`
        absolute inset-0 rounded-2xl pointer-events-none
        border-2 border-white/5 
        group-hover:${colors.border}
        transition-colors duration-500
      `} />

      {/* Corner Accents */}
      <svg className="absolute top-0 left-0 w-8 h-8 opacity-20 group-hover:opacity-60 transition-opacity" viewBox="0 0 32 32">
        <path d="M0 8 L0 0 L8 0" fill="none" stroke={colors.primary} strokeWidth="1" />
      </svg>
      <svg className="absolute top-0 right-0 w-8 h-8 opacity-20 group-hover:opacity-60 transition-opacity" viewBox="0 0 32 32">
        <path d="M24 0 L32 0 L32 8" fill="none" stroke={colors.primary} strokeWidth="1" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-8 h-8 opacity-20 group-hover:opacity-60 transition-opacity" viewBox="0 0 32 32">
        <path d="M0 24 L0 32 L8 32" fill="none" stroke={colors.primary} strokeWidth="1" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-8 h-8 opacity-20 group-hover:opacity-60 transition-opacity" viewBox="0 0 32 32">
        <path d="M24 32 L32 32 L32 24" fill="none" stroke={colors.primary} strokeWidth="1" />
      </svg>
    </motion.div>
  );
};

export default VideoPortalCard;
