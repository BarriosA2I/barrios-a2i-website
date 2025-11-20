/**
 * PreLaunch Component - Barrios A2I
 *
 * Honest positioning: Pre-revenue, accepting founding clients
 * No fake social proof - builds trust through transparency
 */

'use client'

import React from 'react'
import { Rocket, Users, TrendingUp } from 'lucide-react'

export default function PreLaunch() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-8">
            <Rocket size={16} className="text-amber-500" />
            <span className="text-amber-500 font-medium text-sm uppercase tracking-wider">
              Now Accepting Founding Clients
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-space">
            Launch with <span className="text-cyan-400">Early Access</span>
          </h2>

          {/* Honest Positioning */}
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            We&apos;re a <strong className="text-white">pre-revenue startup</strong> accepting our first 15 clients.
            You get production-grade AI products at <strong className="text-cyan-400">50% founding client pricing</strong>—we
            get real-world case studies and testimonials.
          </p>

          {/* Honest Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="backdrop-blur-xl bg-slate-950/50 border border-slate-700 rounded-xl p-6">
              <Users size={32} className="text-cyan-400 mb-3 mx-auto" />
              <div className="text-3xl font-bold text-white mb-2 font-space">15</div>
              <div className="text-slate-400 text-sm">Founding Client Spots</div>
            </div>

            <div className="backdrop-blur-xl bg-slate-950/50 border border-slate-700 rounded-xl p-6">
              <TrendingUp size={32} className="text-amber-500 mb-3 mx-auto" />
              <div className="text-3xl font-bold text-white mb-2 font-space">50%</div>
              <div className="text-slate-400 text-sm">Off Standard Pricing</div>
            </div>

            <div className="backdrop-blur-xl bg-slate-950/50 border border-slate-700 rounded-xl p-6">
              <Rocket size={32} className="text-cyan-400 mb-3 mx-auto" />
              <div className="text-3xl font-bold text-white mb-2 font-space">48h</div>
              <div className="text-slate-400 text-sm">First Deliverable</div>
            </div>
          </div>

          {/* What You Get */}
          <div className="backdrop-blur-xl bg-gradient-to-r from-cyan-400/5 to-amber-500/5 border border-slate-700 rounded-2xl p-8 text-left">
            <h3 className="text-2xl font-bold text-white mb-6 text-center font-space">
              Founding Client Benefits
            </h3>

            <ul className="grid md:grid-cols-2 gap-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <span className="text-slate-300">50% off standard pricing (locked in for 12 months)</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <span className="text-slate-300">Priority support (24-hour response time)</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <span className="text-slate-300">Free feature updates for life</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <span className="text-slate-300">Co-creation input (shape our roadmap)</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <a
              href="#contact"
              className="inline-block px-10 py-5 bg-gradient-to-r from-cyan-400 to-cyan-600 text-slate-950 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-400/50 transition-all hover:scale-105"
            >
              Claim Your Founding Client Spot
            </a>
            <p className="text-slate-500 text-sm mt-4">
              Limited to 15 clients • No long-term contracts • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
