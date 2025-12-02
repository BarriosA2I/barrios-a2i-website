'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiscoveryLead {
  id: string;
  created_at: string;
  session_id: string;
  industry: string;
  company_size: string;
  pain_points: string[];
  current_tools: string[];
  budget_signals: string | null;
  urgency: string;
  qualification_score: number;
  key_insights: string;
  source: string;
}

interface DiscoveryFeedProps {
  leads: DiscoveryLead[];
}

const URGENCY_COLORS = {
  high: 'bg-red-500/20 text-red-400 border-red-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  unknown: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

const SCORE_COLORS = {
  high: 'from-emerald-500 to-cyan-500',
  medium: 'from-yellow-500 to-orange-500',
  low: 'from-slate-500 to-slate-600',
};

function getScoreCategory(score: number): 'high' | 'medium' | 'low' {
  if (score >= 8) return 'high';
  if (score >= 5) return 'medium';
  return 'low';
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export default function DiscoveryFeed({ leads }: DiscoveryFeedProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {leads.map((lead, index) => {
          const scoreCategory = getScoreCategory(lead.qualification_score);
          const urgencyColor = URGENCY_COLORS[lead.urgency as keyof typeof URGENCY_COLORS] || URGENCY_COLORS.unknown;
          const scoreColor = SCORE_COLORS[scoreCategory];

          return (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className={`
                relative p-6 rounded-xl border
                bg-[#0B1220]/80 backdrop-blur-sm
                ${lead.qualification_score >= 8 ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-white/10'}
                hover:border-white/20 transition-all duration-300
              `}
            >
              {/* Hot Lead Badge */}
              {lead.qualification_score >= 8 && (
                <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full text-xs font-bold text-black shadow-lg">
                  HOT LEAD
                </div>
              )}

              {/* Header Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Score Circle */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${scoreColor} flex items-center justify-center shadow-lg`}>
                    <span className="text-lg font-bold text-white">{lead.qualification_score}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {lead.industry || 'Unknown Industry'}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{lead.company_size || 'Unknown size'}</span>
                      <span className="text-slate-600">|</span>
                      <span>{formatTimeAgo(lead.created_at)}</span>
                    </div>
                  </div>
                </div>

                {/* Urgency Badge */}
                <div className={`px-3 py-1 rounded-full border text-xs font-medium ${urgencyColor}`}>
                  {lead.urgency?.toUpperCase() || 'MEDIUM'}
                </div>
              </div>

              {/* Key Insights */}
              <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/5">
                <p className="text-sm text-slate-300 leading-relaxed">
                  &ldquo;{lead.key_insights}&rdquo;
                </p>
              </div>

              {/* Pain Points */}
              {lead.pain_points && lead.pain_points.length > 0 && (
                <div className="mb-4">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">
                    Pain Points
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lead.pain_points.map((pain, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-md bg-red-500/10 text-red-400 border border-red-500/20"
                      >
                        {pain}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools & Budget Row */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  {lead.current_tools && lead.current_tools.length > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500">Tools:</span>
                      <span className="text-cyan-400">{lead.current_tools.join(', ')}</span>
                    </div>
                  )}

                  {lead.budget_signals && (
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-500">$</span>
                      <span className="text-emerald-400">{lead.budget_signals}</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {lead.qualification_score >= 8 && (
                  <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-bold text-xs uppercase rounded-lg transition-all">
                    Call Now
                  </button>
                )}
              </div>

              {/* Session ID Footer */}
              <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-slate-600 font-mono">
                Session: {lead.session_id}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {leads.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-white mb-2">No leads yet</h3>
          <p className="text-slate-400">
            Leads will appear here in real-time as visitors use the Neural Core demo.
          </p>
        </div>
      )}
    </div>
  );
}
