'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// =============================================================================
// STRIPE PAYMENT MODAL - S+++ PRODUCTION
// =============================================================================
// "Deployment Authorization" aesthetic for $50K positioning
// Integrated with lead tracking system
// =============================================================================

// --- ICONS ---
const Icons = {
  Shield: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  CheckGold: () => (
    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  X: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  CreditCard: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  Lock: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Spinner: () => (
    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  Zap: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  Target: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
      <circle cx="12" cy="12" r="6" strokeWidth={1.5} />
      <circle cx="12" cy="12" r="2" strokeWidth={1.5} />
    </svg>
  ),
  Rocket: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
};

// --- TYPES ---
interface Props {
  isOpen: boolean;
  onClose: () => void;
  leadId?: string | null;
  leadEmail?: string | null;
  source?: string;
}

interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: number;
  priceDisplay: string;
  period?: string;
  mode: 'payment' | 'subscription';
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
  icon: React.FC;
  gradient: string;
  borderColor: string;
}

// --- PRICING CONFIGURATION ---
const PRICING_TIERS: PricingTier[] = [
  {
    id: 'tactical-audit',
    name: 'Tactical Audit',
    tagline: 'Map the chaos. Find the gaps.',
    price: 1500,
    priceDisplay: '$1,500',
    mode: 'payment',
    icon: Icons.Target,
    gradient: 'from-slate-500/20 to-cyan-500/10',
    borderColor: 'border-cyan-500/30 hover:border-cyan-500',
    features: [
      'Complete Architecture Analysis',
      'RAG Capability Assessment',
      'Process Bottleneck Identification',
      'Automation Opportunity Map',
      '90-Minute Strategy Debrief',
      'Written Roadmap Deliverable',
    ],
    cta: 'Authorize Audit',
  },
  {
    id: 'strategic-command',
    name: 'Strategic Command',
    tagline: 'Full deployment. Ongoing support.',
    price: 5000,
    priceDisplay: '$5,000',
    period: '/month',
    mode: 'subscription',
    icon: Icons.Rocket,
    gradient: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-500/50 hover:border-amber-500',
    highlighted: true,
    badge: 'Recommended',
    features: [
      'Custom RAG System Build',
      'AI Agent Development',
      'Unlimited Revisions',
      'Dedicated Engineer',
      'Weekly Strategy Calls',
      'Priority Support (24h SLA)',
    ],
    cta: 'Deploy System',
  },
];

// --- MAIN COMPONENT ---
export default function StripePaymentModal({
  isOpen,
  onClose,
  leadId,
  leadEmail,
  source = 'payment-modal',
}: Props) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle checkout
  const handleCheckout = async (tier: PricingTier) => {
    setLoading(tier.id);
    setError(null);

    try {
      // Track the checkout attempt
      if (leadId) {
        await fetch('/api/capture-lead', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadId,
            activityType: 'cta_click',
            metadata: {
              action: 'checkout_initiated',
              tier: tier.id,
              price: tier.price,
            },
          }),
        }).catch(() => {}); // Don't block on tracking
      }

      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId: tier.id,
          mode: tier.mode,
          price: tier.price,
          leadId,
          leadEmail,
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout using the URL from the API response
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }

    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Payment initialization failed');
      setLoading(null);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#0B1220] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white">
                <Icons.Shield />
              </div>
              <div>
                <h2 className="text-white font-bold tracking-wide">Deployment Authorization</h2>
                <p className="text-xs text-slate-500">Select your operational tier</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
            >
              <Icons.X />
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-6 mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm"
            >
              <strong>Error:</strong> {error}
            </motion.div>
          )}

          {/* Pricing Cards */}
          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
            {PRICING_TIERS.map((tier) => {
              const IconComponent = tier.icon;
              const isLoading = loading === tier.id;

              return (
                <motion.div
                  key={tier.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative p-6 rounded-xl border transition-all duration-300
                    bg-gradient-to-br ${tier.gradient}
                    ${tier.borderColor}
                    ${tier.highlighted ? 'ring-1 ring-amber-500/30' : ''}
                  `}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div className="absolute -top-px -right-px bg-amber-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-widest">
                      {tier.badge}
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      ${tier.highlighted ? 'bg-amber-500/20 text-amber-400' : 'bg-cyan-500/20 text-cyan-400'}
                    `}>
                      <IconComponent />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                      <p className="text-sm text-slate-500">{tier.tagline}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className={`text-4xl font-mono font-bold ${tier.highlighted ? 'text-amber-400' : 'text-cyan-400'}`}>
                      {tier.priceDisplay}
                    </span>
                    {tier.period && (
                      <span className="text-slate-500 text-sm">{tier.period}</span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-slate-300">
                        {tier.highlighted ? <Icons.CheckGold /> : <Icons.Check />}
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleCheckout(tier)}
                    disabled={loading !== null}
                    className={`
                      w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm
                      transition-all duration-300 flex items-center justify-center gap-2
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${tier.highlighted
                        ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20'
                        : 'bg-white/5 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black'
                      }
                    `}
                  >
                    {isLoading ? (
                      <>
                        <Icons.Spinner />
                        Initializing...
                      </>
                    ) : (
                      <>
                        <Icons.Zap />
                        {tier.cta}
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-black/50 border-t border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Icons.Lock />
                  256-bit SSL Encryption
                </span>
                <span className="flex items-center gap-1">
                  <Icons.CreditCard />
                  Powered by Stripe
                </span>
              </div>
              <p className="text-[10px] text-slate-600 text-center md:text-right">
                Cancel anytime · No hidden fees · 100% refund within 7 days
              </p>
            </div>
          </div>

          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
