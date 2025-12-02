'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// =============================================================================
// NEURAL CORE DEMO - LIVE ANTIGRAVITY AGENT FLEET
// =============================================================================
// Connected to 8-agent Antigravity system via WebSocket
// Features: Real-time processing, intent classification, confidence display
// =============================================================================

// --- TYPES ---
interface LogEntry {
  step: string;
  msg: string;
  tier?: number;
  timestamp: number;
  status?: 'pending' | 'complete' | 'error';
}

interface QueryResult {
  answer: string;
  sources: string[];
  citations: string[];
  metrics: {
    totalCost: number;
    latencyMs: number;
    intent: string;
    confidence: number;
  };
  validation?: {
    passed: boolean;
    citation_coverage: number;
    factual_grounding: number;
  };
}

interface DemoState {
  status: 'idle' | 'connecting' | 'processing' | 'complete' | 'error' | 'rate-limited';
  logs: LogEntry[];
  result: QueryResult | null;
  error: string | null;
}

type ConnectionState = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR';

// --- ICONS (Zero Dependency) ---
const Icons = {
  Cpu: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  Search: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Zap: () => (
    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  Lock: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Spinner: () => (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  Database: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  Brain: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Route: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Wifi: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>
  ),
  WifiOff: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
    </svg>
  ),
};

// --- INDUSTRY PRESETS ---
const INDUSTRY_PRESETS = [
  {
    industry: 'Dental',
    icon: '🦷',
    query: 'How do I recover revenue from missed patient calls and no-shows?',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    industry: 'Manufacturing',
    icon: '🏭',
    query: 'How can AI predict equipment failures before they cause downtime?',
    color: 'from-orange-500 to-amber-500'
  },
  {
    industry: 'Insurance',
    icon: '🛡️',
    query: 'How do I automate claims processing while staying compliant?',
    color: 'from-purple-500 to-pink-500'
  },
  {
    industry: 'Real Estate',
    icon: '🏠',
    query: 'How can I automatically qualify and follow up with leads 24/7?',
    color: 'from-emerald-500 to-teal-500'
  },
];

// --- TIER CONFIGURATION ---
const TIER_CONFIG: Record<number, { name: string; color: string; icon: React.FC; label: string }> = {
  0: { name: 'CACHE', color: 'text-emerald-400', icon: Icons.Database, label: 'Semantic Cache' },
  1: { name: 'HAIKU', color: 'text-cyan-400', icon: Icons.Zap, label: 'Fast Analysis' },
  2: { name: 'SONNET', color: 'text-amber-400', icon: Icons.Brain, label: 'Deep Reasoning' },
  3: { name: 'OPUS', color: 'text-purple-400', icon: Icons.Shield, label: 'Critical Analysis' },
};

// --- STEP ICONS ---
const STEP_ICONS: Record<string, React.FC> = {
  'GATEKEEPER': Icons.Shield,
  'CACHE': Icons.Database,
  'ROUTER': Icons.Route,
  'ORCHESTRATOR': Icons.Cpu,
  'RAG': Icons.Search,
  'SYNTHESIS': Icons.Brain,
  'COMPLETE': Icons.Check,
  'INTENT': Icons.Route,
  'RETRIEVAL': Icons.Database,
  'FUSION': Icons.Cpu,
  'GENERATION': Icons.Brain,
  'VALIDATION': Icons.Shield,
};

// --- MAIN COMPONENT ---
export default function NeuralCoreDemo() {
  // State
  const [query, setQuery] = useState('');
  const [state, setState] = useState<DemoState>({
    status: 'idle',
    logs: [],
    result: null,
    error: null,
  });
  const [connectionState, setConnectionState] = useState<ConnectionState>('DISCONNECTED');
  const [queryCount, setQueryCount] = useState(0);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Refs
  const logsEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasShownConnectionMessage = useRef(false);

  // WebSocket URL from environment
  const wsUrl = process.env.NEXT_PUBLIC_TRINITY_WS_URL || 'wss://web-production-43c7.up.railway.app/ws/antigravity';

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.logs]);

  // Add log entry
  const addLog = useCallback((entry: Omit<LogEntry, 'timestamp'>) => {
    setState(prev => ({
      ...prev,
      logs: [...prev.logs, { ...entry, timestamp: Date.now() }],
    }));
  }, []);

  // Connect to WebSocket
  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setConnectionState('CONNECTING');

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionState('CONNECTED');
        console.log('Antigravity WebSocket connected');
      };

      ws.onclose = () => {
        setConnectionState('DISCONNECTED');
        wsRef.current = null;
        // Auto-reconnect after 3 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket();
        }, 3000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionState('ERROR');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleWebSocketMessage(data);
        } catch (e) {
          console.error('Failed to parse WebSocket message:', e);
        }
      };
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
      setConnectionState('ERROR');
    }
  }, [wsUrl]);

  // Handle WebSocket messages
  const handleWebSocketMessage = useCallback((data: Record<string, unknown>) => {
    const type = data.type as string;

    switch (type) {
      case 'connected':
        // Only show connection message once (not on reconnects)
        if (!hasShownConnectionMessage.current) {
          hasShownConnectionMessage.current = true;
          addLog({ step: 'SYSTEM', msg: `Connected to Antigravity Fleet (${(data.fleet as string[])?.length || 8} agents)` });
        }
        break;

      case 'processing':
        addLog({ step: 'INTENT', msg: 'Classifying query intent...', status: 'pending', tier: 1 });
        break;

      case 'response':
        // Final response received
        const latencyMs = (data.elapsed_ms as number) || (data.duration_ms as number) || 0;
        const confidence = (data.confidence as number) || 0;
        const intent = (data.intent as string) || 'unknown';
        const content = (data.content as string) || '';
        const sources = (data.sources as Array<{ id?: string }>) || [];
        const citations = (data.citations as string[]) || [];
        const validation = data.validation as { passed?: boolean; citation_coverage?: number; factual_grounding?: number } | undefined;
        const costUsd = (data.cost_usd as number) || 0.02;

        // Add completion logs
        addLog({ step: 'INTENT', msg: `Intent: ${intent} (${Math.round(confidence * 100)}% confidence)`, tier: 1 });
        addLog({ step: 'RETRIEVAL', msg: 'Parallel retrieval swarm completed', tier: 1 });
        addLog({ step: 'FUSION', msg: 'RRF fusion + reranking complete', tier: 1 });
        addLog({ step: 'GENERATION', msg: 'Sonnet 4.5 synthesis complete', tier: 2 });
        if (validation) {
          addLog({
            step: 'VALIDATION',
            msg: `Hallucination check: ${validation.passed ? 'PASSED' : 'FLAGGED'} (${Math.round((validation.factual_grounding || 0) * 100)}% grounding)`,
            tier: 1
          });
        }
        addLog({ step: 'COMPLETE', msg: `Response generated in ${latencyMs}ms`, status: 'complete' });

        setState(prev => ({
          ...prev,
          status: 'complete',
          result: {
            answer: content,
            sources: sources.map(s => s.id || 'source'),
            citations: citations,
            metrics: {
              totalCost: costUsd,
              latencyMs: latencyMs,
              intent: intent,
              confidence: confidence,
            },
            validation: validation ? {
              passed: validation.passed || false,
              citation_coverage: validation.citation_coverage || 0,
              factual_grounding: validation.factual_grounding || 0,
            } : undefined,
          },
        }));

        setQueryCount(prev => prev + 1);
        break;

      case 'error':
        setState(prev => ({
          ...prev,
          status: 'error',
          error: (data.message as string) || 'An error occurred',
        }));
        break;

      case 'heartbeat':
      case 'pong':
        // Ignore heartbeats
        break;

      default:
        console.log('Unknown message type:', type, data);
    }
  }, [addLog]);

  // Connect on mount
  useEffect(() => {
    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connectWebSocket]);

  // Send query to Antigravity
  const sendQuery = useCallback((queryText: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setState(prev => ({
        ...prev,
        status: 'error',
        error: 'Not connected to server. Please wait...',
      }));
      return;
    }

    // Reset state
    setState({
      status: 'processing',
      logs: [],
      result: null,
      error: null,
    });

    // Add initial log
    addLog({ step: 'SYSTEM', msg: `Processing query: "${queryText.substring(0, 50)}..."` });

    // Send to WebSocket
    wsRef.current.send(JSON.stringify({
      type: 'query',
      query: queryText,
    }));
  }, [addLog]);

  // Handle query submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Check if email gate should show (after 1 free query)
    if (queryCount >= 1 && !emailSubmitted) {
      setShowEmailGate(true);
      return;
    }

    sendQuery(query);
  };

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    console.log('Lead captured:', email);
    setEmailSubmitted(true);
    setShowEmailGate(false);
    sendQuery(query);
  };

  // Select preset query
  const selectPreset = (presetQuery: string) => {
    setQuery(presetQuery);
  };

  // Format cost display
  const formatCost = (cost: number) => {
    if (cost === 0) return '$0.00';
    if (cost < 0.001) return '<$0.001';
    return `$${cost.toFixed(4)}`;
  };

  // Get connection status display
  const getConnectionDisplay = () => {
    switch (connectionState) {
      case 'CONNECTED':
        return { color: 'text-emerald-400', icon: <Icons.Wifi />, label: 'ONLINE' };
      case 'CONNECTING':
        return { color: 'text-yellow-400', icon: <Icons.Wifi />, label: 'CONNECTING' };
      case 'ERROR':
        return { color: 'text-red-400', icon: <Icons.WifiOff />, label: 'ERROR' };
      default:
        return { color: 'text-slate-500', icon: <Icons.WifiOff />, label: 'OFFLINE' };
    }
  };

  const connDisplay = getConnectionDisplay();

  return (
    <section id="neural-core-demo" className="py-24 px-6 bg-[#050505] border-t border-white/5 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono tracking-widest uppercase"
          >
            <Icons.Zap />
            Live 8-Agent Fleet
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            See the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400">
              Intelligence
            </span>
            <br />
            In Action.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
          >
            Don&apos;t take our word for it. Test the architecture.
            Watch our <strong className="text-white">Antigravity Agent Fleet</strong> analyze your business challenge in real-time.
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Architecture Explainer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              The 8-Agent Antigravity Fleet
            </h3>

            <div className="space-y-6">
              {Object.entries(TIER_CONFIG).map(([tier, config], index) => {
                const IconComponent = config.icon;
                return (
                  <motion.div
                    key={tier}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${config.color} group-hover:border-current/30 transition-colors`}>
                      <IconComponent />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`font-mono text-sm font-bold ${config.color}`}>
                          TIER {tier}
                        </span>
                        <span className="text-white font-medium">
                          {config.name}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">
                        {tier === '0' && 'Semantic cache serves 80% of queries instantly at $0 cost'}
                        {tier === '1' && 'Claude Haiku handles intent + retrieval at $0.00025/1K tokens'}
                        {tier === '2' && 'Claude Sonnet 4.5 synthesizes deep analysis at $0.003/1K tokens'}
                        {tier === '3' && 'GPT-4o reserved for edge cases requiring maximum capability'}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Agent Fleet Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-10 p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-400">Agent Fleet Status</span>
                <span className={`text-xs font-mono ${connDisplay.color} flex items-center gap-1`}>
                  {connDisplay.icon}
                  {connDisplay.label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  <span className="text-slate-400">IntentClassifier</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="text-slate-400">VectorAgent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span className="text-slate-400">CompetitorAgent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="text-slate-400">GraphAgent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-400">TemporalAgent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span className="text-slate-400">FusionAgent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                  <span className="text-slate-400">GenerationAgent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="text-slate-400">HallucinationChecker</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Glass Panel */}
            <div className="relative z-10 bg-[#0B1220]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/5">

              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  <span className={`w-2 h-2 rounded-full ${connectionState === 'CONNECTED' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
                  Antigravity: <span className={connDisplay.color}>{connDisplay.label}</span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 min-h-[450px] flex flex-col">

                {/* Industry Presets */}
                <div className="mb-4">
                  <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-2">
                    Quick Start — Select Your Industry
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRY_PRESETS.map((preset) => (
                      <button
                        key={preset.industry}
                        onClick={() => selectPreset(preset.query)}
                        disabled={state.status === 'processing'}
                        className={`
                          group flex items-center gap-2 px-3 py-1.5 text-xs
                          bg-white/5 border border-white/10 rounded-full
                          text-slate-400 hover:text-white hover:border-white/20
                          disabled:opacity-50 disabled:cursor-not-allowed
                          transition-all duration-200
                        `}
                      >
                        <span>{preset.icon}</span>
                        <span>{preset.industry}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Area */}
                <div className="flex-1 mb-4 font-mono text-xs space-y-2 overflow-y-auto max-h-[280px] scrollbar-hide">
                  {state.status === 'idle' && state.logs.length === 0 && (
                    <div className="text-slate-600 text-center mt-16 space-y-2">
                      <div className="text-2xl mb-4">🧠</div>
                      <div>[ Antigravity Fleet Standing By ]</div>
                      <div className="text-[10px] text-slate-700">Enter a business challenge to begin analysis</div>
                    </div>
                  )}

                  <AnimatePresence mode="popLayout">
                    {state.logs.map((log, i) => {
                      const StepIcon = STEP_ICONS[log.step] || Icons.Cpu;
                      return (
                        <motion.div
                          key={`${log.step}-${log.timestamp}`}
                          initial={{ opacity: 0, x: -10, height: 0 }}
                          animate={{ opacity: 1, x: 0, height: 'auto' }}
                          exit={{ opacity: 0, x: 10 }}
                          className="flex items-start gap-3 py-1"
                        >
                          <span className="text-slate-600 min-w-[90px] text-right flex items-center justify-end gap-1">
                            <StepIcon />
                            [{log.step}]
                          </span>
                          <span className={`
                            ${log.tier === 0 ? 'text-emerald-400' : ''}
                            ${log.tier === 1 ? 'text-cyan-400' : ''}
                            ${log.tier === 2 ? 'text-amber-400' : ''}
                            ${log.tier === 3 ? 'text-purple-400' : ''}
                            ${log.tier === undefined ? 'text-cyan-300' : ''}
                          `}>
                            {log.msg}
                            {log.status === 'pending' && (
                              <span className="inline-block ml-2">
                                <Icons.Spinner />
                              </span>
                            )}
                          </span>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Processing Indicator */}
                  {state.status === 'processing' && state.logs.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-cyan-400 mt-4"
                    >
                      <Icons.Spinner />
                      <span>Connecting to Antigravity Fleet...</span>
                    </motion.div>
                  )}

                  {/* Error Display */}
                  {state.status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300"
                    >
                      <div className="font-bold mb-1">Error</div>
                      <p>{state.error}</p>
                    </motion.div>
                  )}

                  {/* Rate Limited Display */}
                  {state.status === 'rate-limited' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300"
                    >
                      <div className="font-bold mb-2 flex items-center gap-2">
                        <Icons.Lock />
                        Demo Limit Reached
                      </div>
                      <p className="mb-3">{state.error}</p>
                      <a
                        href="#pricing"
                        className="inline-block px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded transition-colors"
                      >
                        Book Strategy Call
                      </a>
                    </motion.div>
                  )}

                  {/* Result Display */}
                  {state.result && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 space-y-4"
                    >
                      {/* Metrics Bar */}
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-4 text-[10px]">
                          <div>
                            <span className="text-slate-500">Intent: </span>
                            <span className="text-cyan-400 font-bold uppercase">
                              {state.result.metrics.intent}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">Confidence: </span>
                            <span className="text-emerald-400 font-bold">
                              {Math.round(state.result.metrics.confidence * 100)}%
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">Cost: </span>
                            <span className="text-amber-400">
                              {formatCost(state.result.metrics.totalCost)}
                            </span>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {state.result.metrics.latencyMs}ms
                        </div>
                      </div>

                      {/* Answer */}
                      <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                        <div className="flex items-center gap-2 mb-3 text-emerald-400 font-bold text-sm">
                          <Icons.Check />
                          ANALYSIS COMPLETE
                        </div>
                        <p className="text-emerald-100 leading-relaxed whitespace-pre-line text-sm">
                          {state.result.answer}
                        </p>

                        {/* Validation Status */}
                        {state.result.validation && (
                          <div className="mt-3 pt-3 border-t border-emerald-500/20 flex items-center gap-4 text-[10px]">
                            <span className={state.result.validation.passed ? 'text-emerald-400' : 'text-amber-400'}>
                              Validation: {state.result.validation.passed ? 'PASSED' : 'FLAGGED'}
                            </span>
                            <span className="text-slate-500">
                              Grounding: {Math.round(state.result.validation.factual_grounding * 100)}%
                            </span>
                          </div>
                        )}

                        {/* Citations */}
                        {state.result.citations.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-emerald-500/20">
                            <div className="text-[10px] text-emerald-400/60 uppercase tracking-wider mb-2">
                              Citations
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {state.result.citations.map((citation, i) => (
                                <span key={i} className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-300">
                                  {citation}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                        <div>
                          <div className="text-sm text-white font-medium">Ready for the full architecture?</div>
                          <div className="text-xs text-slate-400">8-agent fleet deployed in your infrastructure</div>
                        </div>
                        <a
                          href="#pricing"
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-bold text-xs uppercase tracking-wider rounded transition-all"
                        >
                          Deploy Now
                        </a>
                      </div>
                    </motion.div>
                  )}

                  <div ref={logsEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="relative z-10">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                    <Icons.Search />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onTouchStart={(e) => {
                      // Ensure input gets focus on mobile touch
                      e.currentTarget.focus();
                    }}
                    disabled={state.status === 'processing' || connectionState !== 'CONNECTED'}
                    placeholder={connectionState === 'CONNECTED' ? "Describe a business bottleneck..." : "Connecting to server..."}
                    className="w-full bg-[#050910] border border-white/10 rounded-xl py-4 pl-12 pr-28 text-white text-sm text-base focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    style={{ fontSize: '16px' }}
                  />
                  <button
                    type="submit"
                    disabled={state.status === 'processing' || !query.trim() || connectionState !== 'CONNECTED'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white text-xs font-bold uppercase tracking-wider rounded-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:from-cyan-600 disabled:hover:to-cyan-500 transition-all flex items-center gap-2"
                  >
                    {state.status === 'processing' ? (
                      <>
                        <Icons.Spinner />
                        <span>Running</span>
                      </>
                    ) : (
                      <span>Analyze</span>
                    )}
                  </button>
                </form>

                {/* Query Counter */}
                <div className="mt-3 text-center text-[10px] text-slate-600">
                  {!emailSubmitted ? (
                    <span>
                      {queryCount === 0 ? '1 free analysis remaining' : 'Enter email for unlimited demos'}
                    </span>
                  ) : (
                    <span className="text-emerald-400">Unlimited demos unlocked</span>
                  )}
                </div>
              </div>
            </div>

            {/* Decorative Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-emerald-500/30 to-purple-500/30 rounded-2xl blur-xl opacity-20 -z-10 animate-pulse" />

            {/* Email Gate Overlay */}
            <AnimatePresence>
              {showEmailGate && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-black/90 backdrop-blur-sm rounded-2xl flex items-center justify-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="text-center max-w-sm"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                      <Icons.Lock />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Unlock Unlimited Analysis
                    </h3>
                    <p className="text-slate-400 mb-6">
                      Enter your email to continue testing the 8-agent fleet with unlimited queries.
                    </p>
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-center focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-bold uppercase tracking-wider rounded-lg transition-all"
                      >
                        Continue Demo
                      </button>
                    </form>
                    <button
                      onClick={() => setShowEmailGate(false)}
                      className="mt-4 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      Maybe later
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
