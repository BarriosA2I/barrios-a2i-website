'use client';

/**
 * TRINITY TERMINAL - PRODUCTION HARDENED
 *
 * Security Features:
 * - Multi-tier prompt injection defense
 * - Rate limiting with exponential backoff
 * - Circuit breaker pattern for backend
 * - Audit logging for all inputs
 * - XSS prevention
 * - Input length limits
 *
 * @author Barrios A2I Security Team
 * @version 2.0.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  sanitizeInput,
  checkRateLimit,
  logSecurityEvent,
  type SanitizationResult,
  type ThreatLevel,
} from '@/lib/security';
import {
  // useTrinitySocketMock, // Use mock for development
  useTrinitySocket,  // Use real for production
  type TrinityLogEntry,
  type ConnectionState,
} from '@/hooks/useTrinitySocket';

// ============================================================================
// TYPES
// ============================================================================

type TerminalStage = 'IDLE' | 'VALIDATING' | 'ACTIVE' | 'COMPLETE' | 'ERROR' | 'RATE_LIMITED';

interface InputState {
  niche: string;
  tone: string;
}

interface SecurityAlertType {
  type: 'WARNING' | 'BLOCKED' | 'CRITICAL';
  message: string;
  timestamp: number;
}

// ============================================================================
// ICONS (Inline SVG for zero dependencies)
// ============================================================================

const Icons = {
  Shield: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  AlertTriangle: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  XCircle: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Wifi: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
      />
    </svg>
  ),
  WifiOff: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3"
      />
    </svg>
  ),
};

// ============================================================================
// SECURITY STATUS INDICATOR
// ============================================================================

const SecurityIndicator: React.FC<{
  threatLevel: ThreatLevel;
  rateLimit: { remaining: number; resetIn: number };
}> = ({ threatLevel, rateLimit }) => {
  const getColor = () => {
    switch (threatLevel) {
      case 'SAFE': return 'text-emerald-500';
      case 'SUSPICIOUS': return 'text-yellow-500';
      case 'BLOCKED': return 'text-orange-500';
      case 'CRITICAL': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="flex items-center gap-4 text-[10px] font-mono">
      <div className={`flex items-center gap-1 ${getColor()}`}>
        <Icons.Shield />
        <span>{threatLevel}</span>
      </div>
      <div className="text-slate-500">
        Rate: {rateLimit.remaining}/10
      </div>
    </div>
  );
};

// ============================================================================
// CONNECTION STATUS INDICATOR
// ============================================================================

const ConnectionIndicator: React.FC<{
  state: ConnectionState;
  latency: number;
}> = ({ state, latency }) => {
  const getStateDisplay = () => {
    switch (state) {
      case 'CONNECTED':
        return { color: 'text-emerald-500', icon: <Icons.Wifi />, label: 'ONLINE', pulse: false };
      case 'CONNECTING':
      case 'RECONNECTING':
        return { color: 'text-yellow-500', icon: <Icons.Wifi />, label: state, pulse: true };
      case 'CIRCUIT_OPEN':
        return { color: 'text-red-500', icon: <Icons.WifiOff />, label: 'CIRCUIT OPEN', pulse: false };
      default:
        return { color: 'text-slate-500', icon: <Icons.WifiOff />, label: 'OFFLINE', pulse: false };
    }
  };

  const display = getStateDisplay();

  return (
    <div className={`flex items-center gap-2 ${display.color}`}>
      <span className={display.pulse ? 'animate-pulse' : ''}>{display.icon}</span>
      <span className="text-[10px] font-mono">{display.label}</span>
      {state === 'CONNECTED' && (
        <span className="text-slate-500 text-[10px] font-mono">{latency}ms</span>
      )}
    </div>
  );
};

// ============================================================================
// SECURITY ALERT BANNER
// ============================================================================

const SecurityAlertBanner: React.FC<{
  alert: SecurityAlertType | null;
  onDismiss: () => void;
}> = ({ alert, onDismiss }) => {
  if (!alert) return null;

  const getStyles = () => {
    switch (alert.type) {
      case 'WARNING':
        return 'bg-yellow-950/50 border-yellow-500/50 text-yellow-400';
      case 'BLOCKED':
        return 'bg-orange-950/50 border-orange-500/50 text-orange-400';
      case 'CRITICAL':
        return 'bg-red-950/50 border-red-500/50 text-red-400';
      default:
        return 'bg-slate-950/50 border-slate-500/50 text-slate-400';
    }
  };

  return (
    <div className={`flex items-center justify-between px-4 py-2 border rounded mb-4 ${getStyles()}`}>
      <div className="flex items-center gap-2">
        <Icons.AlertTriangle />
        <span className="text-xs font-mono">{alert.message}</span>
      </div>
      <button
        onClick={onDismiss}
        className="hover:opacity-70 transition-opacity"
      >
        <Icons.XCircle />
      </button>
    </div>
  );
};

// ============================================================================
// LOG ENTRY COMPONENT
// ============================================================================

const LogEntry: React.FC<{ log: TrinityLogEntry }> = ({ log }) => {
  const getLevelStyles = () => {
    switch (log.level) {
      case 'SUCCESS': return 'text-emerald-400 border-emerald-500/30';
      case 'ERROR': return 'text-red-400 border-red-500/30';
      case 'WARN': return 'text-yellow-400 border-yellow-500/30';
      case 'DEBUG': return 'text-purple-400 border-purple-500/30';
      default: return 'text-slate-300 border-transparent';
    }
  };

  const getAgentColor = () => {
    switch (log.agent) {
      case 'SCOUT': return 'text-blue-400';
      case 'SPY': return 'text-purple-400';
      case 'INTEL': return 'text-cyan-400';
      case 'RAGNAROK': return 'text-orange-400';
      case 'TRINITY': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  const timestamp = new Date(log.timestamp).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className={`flex items-start gap-2 border-l-2 pl-2 py-0.5 ${getLevelStyles()}`}>
      <span className="text-slate-600 shrink-0 text-[10px]">[{timestamp}]</span>
      {log.agent && (
        <span className={`shrink-0 font-bold ${getAgentColor()}`}>
          {log.agent}:
        </span>
      )}
      <span className={log.level === 'SUCCESS' ? 'font-bold' : ''}>
        {log.message}
      </span>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function TrinityTerminal() {
  // State
  const [stage, setStage] = useState<TerminalStage>('IDLE');
  const [inputData, setInputData] = useState<InputState>({ niche: '', tone: '' });
  const [lastSanitization, setLastSanitization] = useState<SanitizationResult | null>(null);
  const [securityAlert, setSecurityAlert] = useState<SecurityAlertType | null>(null);
  const [rateLimit, setRateLimit] = useState({ remaining: 10, resetIn: 60000 });

  // Refs
  const logsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // WebSocket hook (connected to real Ragnarok Creative Director)
  const {
    connectionState,
    status,
    logs,
    sendCommand,
    resetCircuit,
    metrics,
  } = useTrinitySocket({
    url: process.env.NEXT_PUBLIC_TRINITY_WS_URL || 'ws://127.0.0.1:8000/ws/creative-director',
    autoConnect: true,
    heartbeatInterval: 30000,
    reconnectAttempts: 5,
    reconnectBaseDelay: 1000,
  });

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Update rate limit display periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const rl = checkRateLimit();
      setRateLimit({ remaining: rl.remaining + 1, resetIn: rl.resetIn }); // +1 because we didn't consume a request
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle input validation in real-time
  const handleInputChange = useCallback((field: keyof InputState, value: string) => {
    // Quick sanitization check for real-time feedback
    const result = sanitizeInput(value, { maxLength: 100, strictMode: false });
    setLastSanitization(result);

    // Update input state
    setInputData(prev => ({ ...prev, [field]: value }));

    // Show warning if suspicious
    if (result.threatLevel !== 'SAFE' && result.flags.length > 0) {
      setSecurityAlert({
        type: result.threatLevel === 'CRITICAL' ? 'CRITICAL' : 'WARNING',
        message: result.flags[0].description,
        timestamp: Date.now(),
      });
    } else {
      setSecurityAlert(null);
    }
  }, []);

  // Execute Trinity sequence
  const startTrinity = useCallback(async () => {
    // Check rate limit
    const rl = checkRateLimit();
    if (!rl.allowed) {
      setStage('RATE_LIMITED');
      setSecurityAlert({
        type: 'BLOCKED',
        message: `Rate limit exceeded. Try again in ${Math.ceil(rl.resetIn / 1000)}s`,
        timestamp: Date.now(),
      });
      return;
    }
    setRateLimit({ remaining: rl.remaining, resetIn: rl.resetIn });

    // Validate inputs
    if (!inputData.niche.trim()) {
      inputRef.current?.focus();
      return;
    }

    setStage('VALIDATING');

    // Full security sanitization
    const nicheResult = sanitizeInput(inputData.niche, { maxLength: 100, strictMode: true });
    const toneResult = sanitizeInput(inputData.tone, { maxLength: 50, strictMode: true });

    // Log for audit
    logSecurityEvent(nicheResult, nicheResult.reject ? 'BLOCKED' : 'ALLOWED', {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    });
    logSecurityEvent(toneResult, toneResult.reject ? 'BLOCKED' : 'ALLOWED');

    // Check if blocked
    if (nicheResult.reject || toneResult.reject) {
      setStage('ERROR');
      setSecurityAlert({
        type: 'CRITICAL',
        message: nicheResult.rejectReason || toneResult.rejectReason || 'Input blocked by security filter',
        timestamp: Date.now(),
      });
      return;
    }

    // Check for warnings
    if (nicheResult.threatLevel !== 'SAFE' || toneResult.threatLevel !== 'SAFE') {
      setSecurityAlert({
        type: 'WARNING',
        message: 'Input modified by security filter. Proceeding with sanitized version.',
        timestamp: Date.now(),
      });
    }

    // Proceed with sanitized inputs
    setStage('ACTIVE');

    const success = await sendCommand({
      action: 'START_CYCLE',
      params: {
        niche: nicheResult.clean,
        tone: toneResult.clean,
        priority: 'NORMAL',
      },
    });

    if (!success) {
      setStage('ERROR');
      setSecurityAlert({
        type: 'BLOCKED',
        message: 'Failed to send command to Trinity server',
        timestamp: Date.now(),
      });
    }
  }, [inputData, sendCommand]);

  // Watch for completion
  useEffect(() => {
    const lastLog = logs[logs.length - 1];
    if (lastLog?.level === 'SUCCESS' && lastLog.message.includes('finished')) {
      setStage('COMPLETE');
    }
  }, [logs]);

  // Reset terminal
  const resetTerminal = useCallback(() => {
    setStage('IDLE');
    setInputData({ niche: '', tone: '' });
    setSecurityAlert(null);
    setLastSanitization(null);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto font-mono text-xs md:text-sm">

      {/* TERMINAL WINDOW */}
      <div className="bg-black/90 border border-cyan-500/30 rounded-lg shadow-[0_0_30px_rgba(0,194,255,0.1)] backdrop-blur-md overflow-hidden">

        {/* HEADER BAR */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <span className="text-cyan-500 font-bold tracking-widest">TRINITY_TERMINAL</span>
            <span className="text-slate-600 text-[10px]">v2.0.0-HARDENED</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Connection Status */}
            <ConnectionIndicator state={connectionState} latency={metrics.latency} />

            {/* Window Controls */}
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700 hover:bg-yellow-500 cursor-pointer transition-colors"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700 hover:bg-emerald-500 cursor-pointer transition-colors"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700 hover:bg-red-500 cursor-pointer transition-colors"></div>
            </div>
          </div>
        </div>

        {/* SECURITY STATUS BAR */}
        <div className="flex items-center justify-between px-4 py-1.5 border-b border-white/5 bg-black/50">
          <SecurityIndicator
            threatLevel={lastSanitization?.threatLevel || 'SAFE'}
            rateLimit={rateLimit}
          />

          {status && (
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="text-slate-500">Agents:</span>
              <span className={status.agents.trendScout === 'REAL' ? 'text-emerald-500' : 'text-yellow-500'}>
                TS:{status.agents.trendScout}
              </span>
              <span className={status.agents.marketIntel === 'REAL' ? 'text-emerald-500' : 'text-yellow-500'}>
                MI:{status.agents.marketIntel}
              </span>
              <span className={status.agents.competitor === 'REAL' ? 'text-emerald-500' : 'text-yellow-500'}>
                CA:{status.agents.competitor}
              </span>
            </div>
          )}
        </div>

        {/* BODY */}
        <div className="p-6 min-h-[350px] flex flex-col">

          {/* Security Alert */}
          <SecurityAlertBanner
            alert={securityAlert}
            onDismiss={() => setSecurityAlert(null)}
          />

          {/* STAGE 1: INPUT FORM */}
          {stage === 'IDLE' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 flex-1">
              <div className="text-cyan-500 mb-4">
                {/* SYSTEM READY. ENTER PARAMETERS TO BEGIN PRODUCTION. */}
                {'// SYSTEM READY. ENTER PARAMETERS TO BEGIN PRODUCTION.'}
              </div>

              <div>
                <label className="flex items-center justify-between text-slate-500 mb-1">
                  <span>&gt; TARGET_NICHE</span>
                  <span className="text-[10px]">{inputData.niche.length}/100</span>
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputData.niche}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded px-3 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-700"
                  placeholder="e.g. Solar Energy Companies"
                  onChange={(e) => handleInputChange('niche', e.target.value)}
                  maxLength={100}
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-slate-500 mb-1">
                  <span>&gt; BRAND_TONE</span>
                  <span className="text-[10px]">{inputData.tone.length}/50</span>
                </label>
                <input
                  type="text"
                  value={inputData.tone}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded px-3 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-700"
                  placeholder="e.g. Aggressive, Cinematic, High-Ticket"
                  onChange={(e) => handleInputChange('tone', e.target.value)}
                  maxLength={50}
                />
              </div>

              <button
                onClick={startTrinity}
                disabled={!inputData.niche.trim() || connectionState !== 'CONNECTED'}
                className="group relative w-full py-4 mt-6 bg-cyan-950/30 border border-cyan-500/50 text-cyan-400 font-bold hover:bg-cyan-500 hover:text-black transition-all uppercase tracking-widest overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-cyan-950/30 disabled:hover:text-cyan-400"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Icons.Shield />
                  [ EXECUTE SECURE TRINITY SEQUENCE ]
                </span>
                <div className="absolute inset-0 bg-cyan-500/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 group-disabled:hidden"></div>
              </button>

              {connectionState !== 'CONNECTED' && (
                <div className="text-center text-yellow-500 text-xs mt-2">
                  Waiting for server connection...
                  {connectionState === 'CIRCUIT_OPEN' && (
                    <button
                      onClick={resetCircuit}
                      className="ml-2 underline hover:text-yellow-400"
                    >
                      Reset Circuit
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STAGE 2: VALIDATING */}
          {stage === 'VALIDATING' && (
            <div className="flex-1 flex flex-col items-center justify-center animate-pulse">
              <Icons.Shield />
              <span className="text-cyan-500 mt-2">Validating input security...</span>
            </div>
          )}

          {/* STAGE 3: LIVE LOGS */}
          {(stage === 'ACTIVE' || stage === 'COMPLETE') && (
            <div className="flex-1 flex flex-col">
              <div className="space-y-1 overflow-y-auto max-h-[280px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent flex-1">
                {logs.map((log, i) => (
                  <LogEntry key={`${log.timestamp}-${i}`} log={log} />
                ))}
                <div ref={logsEndRef} />

                {stage === 'ACTIVE' && (
                  <div className="animate-pulse text-cyan-500 mt-2">_</div>
                )}
              </div>

              {/* STAGE 4: SUCCESS STATE */}
              {stage === 'COMPLETE' && (
                <div className="mt-6 pt-6 border-t border-white/10 animate-in zoom-in duration-300">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 text-emerald-500 text-lg font-bold">
                      <Icons.CheckCircle />
                      ASSETS GENERATED
                    </div>
                    <div className="text-slate-500 text-xs mt-1">
                      Video rendering complete. Files uploaded to secure storage.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={resetTerminal}
                      className="flex-1 py-3 bg-slate-900/50 border border-slate-700 text-slate-400 font-bold hover:bg-slate-800 transition-all"
                    >
                      NEW CYCLE
                    </button>
                    <button className="flex-1 py-3 bg-emerald-900/20 border border-emerald-500/50 text-emerald-400 font-bold hover:bg-emerald-500 hover:text-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      VIEW OUTPUT &gt;&gt;
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ERROR STATE */}
          {stage === 'ERROR' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="text-red-500 mb-4">
                <Icons.XCircle />
              </div>
              <div className="text-red-400 font-bold mb-2">SECURITY BLOCK</div>
              <div className="text-slate-500 text-xs mb-4">
                Input rejected by security filters. Please modify and try again.
              </div>
              <button
                onClick={resetTerminal}
                className="px-6 py-2 border border-slate-700 text-slate-400 hover:bg-slate-800 transition-all"
              >
                RESET
              </button>
            </div>
          )}

          {/* RATE LIMITED STATE */}
          {stage === 'RATE_LIMITED' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="text-yellow-500 mb-4">
                <Icons.AlertTriangle />
              </div>
              <div className="text-yellow-400 font-bold mb-2">RATE LIMITED</div>
              <div className="text-slate-500 text-xs mb-4">
                Too many requests. Please wait before trying again.
              </div>
              <button
                onClick={resetTerminal}
                className="px-6 py-2 border border-slate-700 text-slate-400 hover:bg-slate-800 transition-all"
              >
                RESET
              </button>
            </div>
          )}

        </div>
      </div>

      {/* SECURITY FOOTER */}
      <div className="flex justify-between items-center mt-2 text-[10px] text-slate-600 uppercase tracking-wider px-1">
        <div className="flex items-center gap-2">
          <Icons.Shield />
          <span>Hardened Terminal v2.0</span>
        </div>
        <div className="flex items-center gap-4">
          <span>TLS 1.3</span>
          <span>Input Sanitization: ACTIVE</span>
          <span className="text-emerald-600">Audit: ENABLED</span>
        </div>
      </div>

    </div>
  );
}
