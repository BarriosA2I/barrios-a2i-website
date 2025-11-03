'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function HeroDualPath() {
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Skip the white frames at the start of the video
    if (videoRef.current) {
      videoRef.current.currentTime = 0.5 // Start at 0.5 seconds to skip white frames
    }
  }, [])

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2 + 1.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-950">
      {/* FULL PAGE ANIMATED LOGO VIDEO - 50% BRIGHTER */}
      <div className="absolute inset-0 flex items-center justify-center bg-slate-950" style={{ backgroundColor: '#020617' }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(1.5) drop-shadow(0 0 80px rgba(0, 217, 255, 0.9)) drop-shadow(0 0 120px rgba(255, 167, 38, 0.6))',
            backgroundColor: '#020617',
          }}
        >
          <source src="/videos/Video_Optimization_Command_and_Generation.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Lighter overlay for text readability */}
      <div className="absolute inset-0 bg-slate-950/20" />
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="relative z-10 min-h-screen w-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Empty space on left for logo visibility */}
            <div></div>

            <motion.div
              className="text-center lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                custom={0}
                variants={textVariants}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400/10 to-amber-500/10 border border-cyan-400/30 rounded-full mb-6 sm:mb-8"
              >
                <Zap size={16} className="text-amber-500 animate-pulse" />
                <span className="text-cyan-400 font-medium text-xs sm:text-sm tracking-wider uppercase">
                  Transform Your Operations
                </span>
                <Zap size={16} className="text-amber-500 animate-pulse" />
              </motion.div>

              <motion.h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
                <motion.span
                  custom={1}
                  variants={textVariants}
                  className="block text-cyan-400 drop-shadow-[0_0_20px_rgba(0,217,255,0.5)]"
                >
                  Chaos
                </motion.span>

                <motion.span
                  custom={2}
                  variants={textVariants}
                  className="block text-slate-300 my-2"
                >
                  →
                </motion.span>

                <motion.span
                  custom={3}
                  variants={textVariants}
                  className="block text-amber-500 drop-shadow-[0_0_20px_rgba(255,167,38,0.5)]"
                >
                  Precision
                </motion.span>
              </motion.h1>

              <motion.p
                custom={4}
                variants={textVariants}
                className="text-lg sm:text-xl text-slate-300 max-w-xl mb-8 leading-relaxed"
              >
                Whether you&apos;re automating SMB workflows or building enterprise-scale AI systems,
                we turn operational chaos into orchestrated precision.
              </motion.p>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  custom={0}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link href="/qualify/smb" className="group relative block w-full">
                    <div className="relative p-6 bg-gradient-to-br from-cyan-400/10 to-cyan-400/5 border-2 border-cyan-400/50 rounded-xl hover:border-cyan-400 transition-all duration-300 overflow-hidden">
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-cyan-300 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />

                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <Zap size={20} className="text-cyan-400" />
                          <h3 className="text-lg font-space font-bold text-cyan-400">
                            Quick-Win Automation
                          </h3>
                        </div>

                        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                          SMB automation deployed in 2-6 weeks. From $8K.
                        </p>

                        <div className="flex items-center gap-2 font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors text-sm">
                          Get Started
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link href="/qualify/enterprise" className="group relative block w-full">
                    <div className="relative p-6 bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-2 border-amber-500/50 rounded-xl hover:border-amber-500 transition-all duration-300 overflow-hidden">
                      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />

                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <Building2 size={20} className="text-amber-500" />
                          <h3 className="text-lg font-space font-bold text-amber-500">
                            AI Infrastructure
                          </h3>
                        </div>

                        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                          Enterprise multi-agent orchestration platform.
                        </p>

                        <div className="flex items-center gap-2 font-bold text-amber-500 group-hover:text-amber-400 transition-colors text-sm">
                          Explore Platform
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                custom={5}
                variants={textVariants}
                className="mt-8 pt-8 border-t border-slate-800"
              >
                <p className="text-slate-400 text-sm mb-4">Trusted by innovative teams at:</p>
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start opacity-60">
                  <div className="text-slate-500 font-mono text-xs">HEALTHCARE</div>
                  <div className="text-slate-500 font-mono text-xs">LOGISTICS</div>
                  <div className="text-slate-500 font-mono text-xs">MANUFACTURING</div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer">
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
