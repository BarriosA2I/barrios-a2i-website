'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import DiscoveryFeed from '@/components/dashboard/DiscoveryFeed';

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

interface Stats {
  total: number;
  hotLeads: number;
  avgScore: number;
  topIndustry: string;
}

export default function DashboardPage() {
  const [leads, setLeads] = useState<DiscoveryLead[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, hotLeads: 0, avgScore: 0, topIndustry: '-' });
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Initial fetch
    fetchLeads();

    // Real-time subscription
    const channel = supabase
      .channel('discovery_leads_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'discovery_leads' },
        (payload) => {
          console.log('New lead received:', payload);
          setLeads(prev => [payload.new as DiscoveryLead, ...prev]);
        }
      )
      .subscribe((status) => {
        console.log('Supabase subscription status:', status);
        setConnected(status === 'SUBSCRIBED');
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Calculate stats whenever leads change
  useEffect(() => {
    if (leads.length > 0) {
      const hotLeads = leads.filter(l => l.qualification_score >= 8).length;
      const avgScore = leads.reduce((sum, l) => sum + l.qualification_score, 0) / leads.length;

      // Count industries
      const industryCounts: Record<string, number> = {};
      leads.forEach(l => {
        if (l.industry && l.industry !== 'Unknown') {
          industryCounts[l.industry] = (industryCounts[l.industry] || 0) + 1;
        }
      });
      const topIndustry = Object.entries(industryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

      setStats({
        total: leads.length,
        hotLeads,
        avgScore: Math.round(avgScore * 10) / 10,
        topIndustry
      });
    }
  }, [leads]);

  async function fetchLeads() {
    try {
      const { data, error } = await supabase
        .from('discovery_leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching leads:', error);
      } else if (data) {
        setLeads(data);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070B14]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0B1220]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white">
                Discovery Feed
              </h1>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                connected
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald-500 animate-pulse' : 'bg-yellow-500'}`} />
                {connected ? 'LIVE' : 'CONNECTING'}
              </div>
            </div>

            <a
              href="/"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Back to Site
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-6 rounded-xl bg-[#0B1220]/80 border border-white/10">
            <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-sm text-slate-400">Total Leads</div>
          </div>
          <div className="p-6 rounded-xl bg-[#0B1220]/80 border border-emerald-500/30">
            <div className="text-3xl font-bold text-emerald-400 mb-1">{stats.hotLeads}</div>
            <div className="text-sm text-slate-400">Hot Leads (8+)</div>
          </div>
          <div className="p-6 rounded-xl bg-[#0B1220]/80 border border-white/10">
            <div className="text-3xl font-bold text-cyan-400 mb-1">{stats.avgScore}</div>
            <div className="text-sm text-slate-400">Avg Score</div>
          </div>
          <div className="p-6 rounded-xl bg-[#0B1220]/80 border border-white/10">
            <div className="text-3xl font-bold text-white mb-1 truncate">{stats.topIndustry}</div>
            <div className="text-sm text-slate-400">Top Industry</div>
          </div>
        </div>

        {/* Feed */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <DiscoveryFeed leads={leads} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-slate-500">
          <p>Discovery Pipeline - Barrios A2I Neural Core</p>
          <p className="mt-1 text-slate-600">Real-time lead qualification from website visitors</p>
        </div>
      </footer>
    </div>
  );
}
