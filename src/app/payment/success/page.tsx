'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

// =============================================================================
// PAYMENT SUCCESS PAGE - S+++ PRODUCTION
// =============================================================================
// Displayed after successful Stripe checkout
// Shows confirmation, order details, and next steps
// =============================================================================

// --- ICONS ---
const Icons = {
  CheckCircle: () => (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Rocket: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

// --- TYPES ---
interface SessionDetails {
  tier: string;
  amount: number;
  email: string;
  mode: 'payment' | 'subscription';
}

// --- TIER DISPLAY CONFIG ---
const TIER_DISPLAY: Record<string, { name: string; color: string; nextSteps: string[] }> = {
  'tactical-audit': {
    name: 'Tactical Audit',
    color: 'cyan',
    nextSteps: [
      'Check your email for confirmation and intake questionnaire',
      'Complete the 10-minute pre-call assessment',
      'Schedule your 90-minute strategy debrief',
      'Receive your written roadmap within 48 hours of call',
    ],
  },
  'strategic-command': {
    name: 'Strategic Command',
    color: 'amber',
    nextSteps: [
      'Check your email for welcome package and onboarding',
      'Complete the system requirements questionnaire',
      'Your dedicated engineer will reach out within 24 hours',
      'First weekly strategy call scheduled within the week',
    ],
  },
};

// --- SUCCESS CONTENT COMPONENT ---
function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<SessionDetails | null>(null);

  useEffect(() => {
    async function fetchSessionDetails() {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/checkout/session?id=${sessionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch session details');
        }
        const data = await response.json();
        setDetails(data);
      } catch (err) {
        console.error('Error fetching session:', err);
        // Still show success page even if details fail to load
        setDetails({
          tier: 'tactical-audit',
          amount: 0,
          email: '',
          mode: 'payment',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchSessionDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0E17] flex items-center justify-center">
        <div className="text-center">
          <div className="text-cyan-400 mb-4 flex justify-center">
            <Icons.Spinner />
          </div>
          <p className="text-slate-500 font-mono text-sm">VERIFYING TRANSACTION...</p>
        </div>
      </div>
    );
  }

  const tierConfig = TIER_DISPLAY[details?.tier || 'tactical-audit'] || TIER_DISPLAY['tactical-audit'];
  const colorClass = tierConfig.color === 'amber' ? 'text-amber-400' : 'text-cyan-400';
  const bgColorClass = tierConfig.color === 'amber' ? 'bg-amber-500/10' : 'bg-cyan-500/10';
  const borderColorClass = tierConfig.color === 'amber' ? 'border-amber-500/30' : 'border-cyan-500/30';

  return (
    <div className="min-h-screen bg-[#0A0E17] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="text-center mb-8"
        >
          <div className={`${colorClass} flex justify-center mb-6`}>
            <Icons.CheckCircle />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            Deployment Authorized
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-slate-400 text-lg"
          >
            Your {tierConfig.name} has been activated
          </motion.p>
        </motion.div>

        {/* Order Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className={`${bgColorClass} ${borderColorClass} border rounded-xl p-6 mb-8`}
        >
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <span className="text-slate-400">Order Reference</span>
            <span className="font-mono text-sm text-white">{sessionId?.slice(-12).toUpperCase()}</span>
          </div>

          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <span className="text-slate-400">Service</span>
            <span className={`font-bold ${colorClass}`}>{tierConfig.name}</span>
          </div>

          {details?.amount && details.amount > 0 && (
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
              <span className="text-slate-400">Amount</span>
              <span className="font-mono text-xl text-white">
                ${details.amount.toLocaleString()}
                {details.mode === 'subscription' && <span className="text-sm text-slate-500">/mo</span>}
              </span>
            </div>
          )}

          {details?.email && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Confirmation sent to</span>
              <span className="text-white">{details.email}</span>
            </div>
          )}
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8"
        >
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Icons.Rocket />
            Next Steps
          </h2>

          <ul className="space-y-4">
            {tierConfig.nextSteps.map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className={`
                  w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                  ${bgColorClass} ${colorClass} font-mono text-sm
                `}>
                  {index + 1}
                </span>
                <span className="text-slate-300">{step}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="https://calendly.com/barrios-a2i/strategy"
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex-1 py-4 rounded-lg font-bold text-center uppercase tracking-widest text-sm
              flex items-center justify-center gap-2
              ${tierConfig.color === 'amber'
                ? 'bg-amber-500 hover:bg-amber-400 text-black'
                : 'bg-cyan-500 hover:bg-cyan-400 text-black'
              }
              transition-colors
            `}
          >
            <Icons.Calendar />
            Schedule Call Now
          </a>

          <Link
            href="/"
            className="flex-1 py-4 rounded-lg font-bold text-center uppercase tracking-widest text-sm
              bg-white/5 border border-white/20 text-white hover:bg-white/10
              transition-colors flex items-center justify-center gap-2"
          >
            Return to Base
          </Link>
        </motion.div>

        {/* Support Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
          className="text-center text-sm text-slate-600 mt-8"
        >
          Questions? Contact{' '}
          <a href="mailto:support@barriosa2i.com" className={`${colorClass} hover:underline`}>
            support@barriosa2i.com
          </a>
        </motion.p>
      </div>

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] ${
          tierConfig.color === 'amber' ? 'bg-amber-500/5' : 'bg-cyan-500/5'
        } blur-[150px] rounded-full`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] ${
          tierConfig.color === 'amber' ? 'bg-orange-500/5' : 'bg-emerald-500/5'
        } blur-[150px] rounded-full`} />
      </div>
    </div>
  );
}

// --- MAIN COMPONENT WITH SUSPENSE ---
export default function PaymentSuccessPage() {
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
      <SuccessContent />
    </Suspense>
  );
}
