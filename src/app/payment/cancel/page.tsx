'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

// =============================================================================
// PAYMENT CANCEL PAGE - S+++ PRODUCTION
// =============================================================================
// Displayed when user cancels Stripe checkout
// Offers recovery options and support
// =============================================================================

// --- ICONS ---
const Icons = {
  ArrowLeft: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  MessageCircle: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  HelpCircle: () => (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Spinner: () => (
    <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
};

// --- TIER DISPLAY CONFIG ---
const TIER_DISPLAY: Record<string, { name: string; price: string }> = {
  'tactical-audit': {
    name: 'Tactical Audit',
    price: '$1,500',
  },
  'strategic-command': {
    name: 'Strategic Command',
    price: '$5,000/mo',
  },
};

// --- COMMON CONCERNS ---
const CONCERNS = [
  {
    icon: Icons.Clock,
    question: 'Need more time to decide?',
    answer: 'No rush. Book a free 15-minute call to discuss your specific situation.',
    cta: 'Schedule Call',
    href: 'https://calendly.com/barrios-a2i/discovery',
  },
  {
    icon: Icons.HelpCircle,
    question: 'Have questions about the service?',
    answer: "We're happy to clarify scope, deliverables, or timeline before you commit.",
    cta: 'Ask a Question',
    href: 'mailto:questions@barriosa2i.com?subject=Question about services',
  },
  {
    icon: Icons.Shield,
    question: 'Concerned about fit?',
    answer: "The Tactical Audit includes a full refund guarantee if we're not a match.",
    cta: 'Learn More',
    href: '/#faq',
  },
];

// --- CANCEL CONTENT COMPONENT ---
function CancelContent() {
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier') || 'tactical-audit';
  const tierConfig = TIER_DISPLAY[tier] || TIER_DISPLAY['tactical-audit'];

  return (
    <div className="min-h-screen bg-[#0A0E17] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-slate-500 flex justify-center mb-6">
            <Icons.HelpCircle />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Deployment Paused
          </h1>

          <p className="text-slate-400 text-lg">
            No worries — your {tierConfig.name} checkout was not completed.
          </p>
        </motion.div>

        {/* Resume Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6 mb-8 text-center"
        >
          <h2 className="text-lg font-bold text-white mb-2">
            Ready to continue?
          </h2>
          <p className="text-slate-400 mb-4">
            Pick up where you left off with the {tierConfig.name} ({tierConfig.price}).
          </p>
          <Link
            href="/#demo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400
              text-black font-bold uppercase tracking-widest text-sm rounded-lg transition-colors"
          >
            <Icons.ArrowLeft />
            Return to Demo
          </Link>
        </motion.div>

        {/* Common Concerns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-8"
        >
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
            Common Concerns
          </h3>

          {CONCERNS.map((concern, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="text-cyan-400 mt-0.5">
                  <concern.icon />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">{concern.question}</h4>
                  <p className="text-sm text-slate-400 mb-3">{concern.answer}</p>
                  <a
                    href={concern.href}
                    className="text-sm text-cyan-400 hover:text-cyan-300 font-medium uppercase tracking-wider"
                  >
                    {concern.cta} →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Alternative Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          <a
            href="https://calendly.com/barrios-a2i/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="py-4 px-6 rounded-lg font-bold text-center uppercase tracking-widest text-xs
              bg-white/5 border border-white/20 text-white hover:bg-white/10
              transition-colors flex items-center justify-center gap-2"
          >
            <Icons.Calendar />
            Book Discovery Call
          </a>

          <a
            href="mailto:hello@barriosa2i.com"
            className="py-4 px-6 rounded-lg font-bold text-center uppercase tracking-widest text-xs
              bg-white/5 border border-white/20 text-white hover:bg-white/10
              transition-colors flex items-center justify-center gap-2"
          >
            <Icons.MessageCircle />
            Contact Us
          </a>
        </motion.div>

        {/* Return Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <Link
            href="/"
            className="text-slate-500 hover:text-slate-400 text-sm transition-colors"
          >
            ← Return to Homepage
          </Link>
        </motion.div>
      </div>

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-slate-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-cyan-500/5 blur-[150px] rounded-full" />
      </div>
    </div>
  );
}

// --- MAIN COMPONENT WITH SUSPENSE ---
export default function PaymentCancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0E17] flex items-center justify-center">
        <div className="text-center">
          <div className="text-cyan-400 mb-4 flex justify-center">
            <Icons.Spinner />
          </div>
          <p className="text-slate-500 font-mono text-sm">LOADING...</p>
        </div>
      </div>
    }>
      <CancelContent />
    </Suspense>
  );
}
