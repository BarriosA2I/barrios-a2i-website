"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-navy-deep">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Ready to Build Something{" "}
            <span className="gradient-text">Real</span>?
          </h2>
          
          <p className="text-xl text-slate-300 mb-10">
            No fluff. No 47-step funnels. Just honest work that drives ROI.
          </p>

          <Link
            href="https://calendly.com/barriosa2i"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-cyber-cyan text-navy-deep font-bold text-lg rounded-lg hover:shadow-glow-cyan hover:scale-105 transition-all duration-300"
          >
            Book a Call
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
