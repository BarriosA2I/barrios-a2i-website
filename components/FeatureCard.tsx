'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="group relative"
    >
      {/* Glassmorphic card with border glow */}
      <div className="relative h-full p-8 rounded-2xl bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] overflow-hidden transition-all duration-300 hover:border-[var(--cyan)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">

        {/* Gradient glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan)]/10 to-[var(--gold)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon with animated glow */}
          <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-[var(--cyan)]/20 to-[var(--gold)]/20 border border-[var(--cyan)]/30 mb-6 group-hover:border-[var(--cyan)] transition-all duration-300">
            <Icon size={32} className="text-[var(--cyan)] group-hover:text-[var(--gold)] transition-colors duration-300" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[var(--cyan)] transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--cyan)]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}
