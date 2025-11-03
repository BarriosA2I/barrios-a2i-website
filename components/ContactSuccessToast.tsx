"use client"

import { motion } from "framer-motion"

export default function ContactSuccessToast() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#0E1626] to-[#0B1220] px-5 py-4 shadow-[0_10px_40px_rgba(0,194,255,0.3)] border border-cyan-400/40"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-2 ring-emerald-400/40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-white">Request received</p>
        <p className="text-xs text-slate-200/70">
          Barrios A2I will reply in &lt; 24 hours with the next steps.
        </p>
      </div>
    </motion.div>
  )
}
