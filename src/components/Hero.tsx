"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center">

      {/* 1. BACKGROUND: The "Macro Data Landscape" */}
      <div className="absolute inset-0 z-0">
        {/* Dark Cityscape/Server Rack abstraction */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:perspective(1000px)_rotateX(60deg)_scale(3)] origin-top opacity-30" />

        {/* The "Horizon" Glow */}
        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-cyan-900/20 via-black to-transparent" />

        {/* Scanning Laser Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(transparent_0%,rgba(0,194,255,0.1)_50%,transparent_100%)] bg-[size:100%_200%] animate-[scan_8s_linear_infinite] pointer-events-none" />
      </div>

      {/* 2. HUD OVERLAY: Technical UI elements in corners */}
      <div className="absolute inset-0 z-10 pointer-events-none">
         {/* Top Left */}
         <div className="absolute top-8 left-8 flex flex-col gap-1">
            <div className="text-[10px] text-cyber-cyan font-mono tracking-widest">SYS.STATUS: <span className="text-emerald-500 animate-pulse">OPTIMIZED</span></div>
            <div className="w-32 h-px bg-cyber-cyan/30"></div>
            <div className="text-[10px] text-slate-600 font-mono">ID: BARRIOS-A2I</div>
         </div>
         {/* Top Right */}
         <div className="absolute top-8 right-8 text-right">
            <div className="text-[10px] text-cyber-cyan font-mono tracking-widest">NET.LATENCY: 12ms</div>
            <div className="flex gap-1 justify-end mt-1">
               <span className="w-1 h-1 bg-cyber-cyan rounded-full"></span>
               <span className="w-1 h-1 bg-cyber-cyan rounded-full opacity-50"></span>
               <span className="w-1 h-1 bg-cyber-cyan rounded-full opacity-25"></span>
            </div>
         </div>
         {/* Bottom Left Crosshair */}
         <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-cyber-cyan/30"></div>
         {/* Bottom Right Crosshair */}
         <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-cyber-cyan/30"></div>
      </div>

      {/* 3. CONTENT: The "Command Deck" Copy */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Floating "Glass" Panel for Text */}
          <div className="relative p-8 md:p-12 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
            {/* Decorative border glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-cyber-cyan/20 to-transparent rounded-2xl opacity-50 blur-sm -z-10"></div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] tracking-tighter mb-6">
              THE INFRASTRUCTURE OF A <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-cyan">$10M COMPANY.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 font-light mb-8 max-w-xl">
              <span className="text-slate-500">(Even if you aren&apos;t one yet.)</span>
              <br /><br />
              <span className="text-slate-200 font-medium">Stop cobbling together cheap tools.</span> We engineer a single, centralized Command Deck that automates your sales, support, and fulfillment.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="#pricing"
                className="group relative px-8 py-4 bg-cyber-cyan hover:bg-white text-navy-deep font-bold tracking-widest uppercase text-sm transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,194,255,0.4)] text-center"
              >
                Deploy Command Deck
                <div className="absolute inset-0 border border-white/20"></div>
              </Link>

              <Link
                href="#process"
                className="group px-8 py-4 bg-transparent border border-slate-600 text-slate-300 font-bold tracking-widest uppercase text-sm hover:border-cyber-cyan hover:text-cyber-cyan transition-all text-center"
              >
                View Architecture
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right Side: The Visual "Hologram" Focus */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:col-span-5 lg:flex items-center justify-center"
        >
           <div className="relative w-full aspect-square max-w-md">
              {/* Rotating Rings (CSS Animation) */}
              <div className="absolute inset-0 border border-cyber-cyan/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-8 border border-dashed border-cyber-cyan/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-20 border border-dotted border-emerald-500/30 rounded-full animate-[spin_20s_linear_infinite]"></div>

              {/* Center Data Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                 <div className="text-4xl font-mono font-bold text-white mb-2 tracking-tighter">100%</div>
                 <div className="text-xs text-cyber-cyan uppercase tracking-widest bg-cyber-cyan/10 px-3 py-1.5 rounded border border-cyber-cyan/30">
                    Operational
                 </div>
              </div>
           </div>
        </motion.div>

      </div>
    </section>
  )
}
