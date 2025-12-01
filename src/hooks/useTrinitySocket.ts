/**
 * TRINITY WEBSOCKET HOOK
 * Production-grade WebSocket connection with:
 * - Circuit breaker pattern
 * - Automatic reconnection with exponential backoff
 * - Message queuing during disconnection
 * - Heartbeat/keepalive
 * - Connection state management
 *
 * @author Barrios A2I Engineering
 * @version 2.0.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export type ConnectionState =
  | 'DISCONNECTED'
  | 'CONNECTING'
  | 'CONNECTED'
  | 'RECONNECTING'
  | 'CIRCUIT_OPEN';

export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface TrinityMessage {
  type: 'COMMAND' | 'STATUS' | 'LOG' | 'ERROR' | 'RESULT' | 'HEARTBEAT';
  payload: unknown;
  requestId?: string;
  timestamp: number;
}

export interface TrinityCommand {
  action: 'START_CYCLE' | 'STOP_CYCLE' | 'GET_STATUS' | 'PING';
  params?: {
    niche?: string;
    tone?: string;
    priority?: 'LOW' | 'NORMAL' | 'HIGH';
  };
}

export interface TrinityLogEntry {
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' | 'SUCCESS';
  agent?: string;
  message: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface TrinityStatus {
  orchestratorOnline: boolean;
  activeJobs: number;
  queueDepth: number;
  agents: {
    trendScout: 'REAL' | 'STUB' | 'OFFLINE';
    marketIntel: 'REAL' | 'STUB' | 'OFFLINE';
    competitor: 'REAL' | 'STUB' | 'OFFLINE';
  };
  systemHealth: 'HEALTHY' | 'DEGRADED' | 'CRITICAL';
}

export interface UseTrinitySocketOptions {
  url: string;
  autoConnect?: boolean;
  heartbeatInterval?: number;
  reconnectAttempts?: number;
  reconnectBaseDelay?: number;
  circuitBreakerThreshold?: number;
  circuitBreakerResetTime?: number;
  onMessage?: (message: TrinityMessage) => void;
  onLog?: (log: TrinityLogEntry) => void;
  onStatusChange?: (status: TrinityStatus) => void;
  onError?: (error: Error) => void;
  onConnectionChange?: (state: ConnectionState) => void;
}

export interface UseTrinitySocketReturn {
  /** Current connection state */
  connectionState: ConnectionState;
  /** Circuit breaker state */
  circuitState: CircuitState;
  /** Latest server status */
  status: TrinityStatus | null;
  /** Log entries received */
  logs: TrinityLogEntry[];
  /** Send a command to Trinity */
  sendCommand: (command: TrinityCommand) => Promise<boolean>;
  /** Manually connect */
  connect: () => void;
  /** Manually disconnect */
  disconnect: () => void;
  /** Clear logs */
  clearLogs: () => void;
  /** Reset circuit breaker */
  resetCircuit: () => void;
  /** Connection metrics */
  metrics: {
    latency: number;
    messagesReceived: number;
    messagesSent: number;
    reconnectAttempts: number;
    lastConnected: number | null;
  };
}

// ============================================================================
// CIRCUIT BREAKER IMPLEMENTATION
// ============================================================================

class CircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failures = 0;
  private lastFailure: number | null = null;
  private readonly threshold: number;
  private readonly resetTime: number;

  constructor(threshold = 3, resetTime = 30000) {
    this.threshold = threshold;
    this.resetTime = resetTime;
  }

  getState(): CircuitState {
    if (this.state === 'OPEN' && this.lastFailure) {
      // Check if reset time has passed
      if (Date.now() - this.lastFailure > this.resetTime) {
        this.state = 'HALF_OPEN';
      }
    }
    return this.state;
  }

  recordSuccess(): void {
    this.failures = 0;
    this.state = 'CLOSED';
    this.lastFailure = null;
  }

  recordFailure(): void {
    this.failures++;
    this.lastFailure = Date.now();

    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
    }
  }

  canAttempt(): boolean {
    const currentState = this.getState();
    return currentState === 'CLOSED' || currentState === 'HALF_OPEN';
  }

  reset(): void {
    this.state = 'CLOSED';
    this.failures = 0;
    this.lastFailure = null;
  }
}

// ============================================================================
// WEBSOCKET HOOK
// ============================================================================

export function useTrinitySocket(options: UseTrinitySocketOptions): UseTrinitySocketReturn {
  const {
    url,
    autoConnect = true,
    heartbeatInterval = 30000,
    reconnectAttempts = 5,
    reconnectBaseDelay = 1000,
    circuitBreakerThreshold = 3,
    circuitBreakerResetTime = 30000,
    onMessage,
    onLog,
    onStatusChange,
    onError,
    onConnectionChange,
  } = options;

  // State
  const [connectionState, setConnectionState] = useState<ConnectionState>('DISCONNECTED');
  const [circuitState, setCircuitState] = useState<CircuitState>('CLOSED');
  const [status, setStatus] = useState<TrinityStatus | null>(null);
  const [logs, setLogs] = useState<TrinityLogEntry[]>([]);
  const [metrics, setMetrics] = useState({
    latency: 0,
    messagesReceived: 0,
    messagesSent: 0,
    reconnectAttempts: 0,
    lastConnected: null as number | null,
  });

  // Refs
  const wsRef = useRef<WebSocket | null>(null);
  const circuitRef = useRef(new CircuitBreaker(circuitBreakerThreshold, circuitBreakerResetTime));
  const reconnectCountRef = useRef(0);
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageQueueRef = useRef<TrinityCommand[]>([]);
  const lastPingRef = useRef<number>(0);

  // Update connection state with callback
  const updateConnectionState = useCallback((newState: ConnectionState) => {
    setConnectionState(newState);
    onConnectionChange?.(newState);
  }, [onConnectionChange]);

  // Update circuit state
  const updateCircuitState = useCallback(() => {
    const newState = circuitRef.current.getState();
    setCircuitState(newState);
    if (newState === 'OPEN') {
      updateConnectionState('CIRCUIT_OPEN');
    }
  }, [updateConnectionState]);

  // Add log entry
  const addLog = useCallback((log: TrinityLogEntry) => {
    setLogs(prev => [...prev.slice(-99), log]); // Keep last 100 logs
    onLog?.(log);
  }, [onLog]);

  // Process incoming message
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message: TrinityMessage = JSON.parse(event.data);

      setMetrics(prev => ({
        ...prev,
        messagesReceived: prev.messagesReceived + 1,
      }));

      // Calculate latency from heartbeat
      if (message.type === 'HEARTBEAT' && lastPingRef.current) {
        const latency = Date.now() - lastPingRef.current;
        setMetrics(prev => ({ ...prev, latency }));
        lastPingRef.current = 0;
      }

      // Handle different message types
      switch (message.type) {
        case 'STATUS':
          const statusPayload = message.payload as TrinityStatus;
          setStatus(statusPayload);
          onStatusChange?.(statusPayload);
          break;

        case 'LOG':
          const logPayload = message.payload as TrinityLogEntry;
          addLog(logPayload);
          break;

        case 'ERROR':
          const errorPayload = message.payload as { message: string; code?: string };
          onError?.(new Error(errorPayload.message));
          addLog({
            level: 'ERROR',
            message: errorPayload.message,
            timestamp: Date.now(),
            metadata: { code: errorPayload.code },
          });
          break;

        case 'RESULT':
          // Handle completion results
          addLog({
            level: 'SUCCESS',
            message: 'Production cycle completed',
            timestamp: Date.now(),
            metadata: message.payload as Record<string, unknown>,
          });
          break;

        default:
          break;
      }

      onMessage?.(message);
      circuitRef.current.recordSuccess();
      updateCircuitState();

    } catch (error) {
      console.error('[TRINITY_WS] Failed to parse message:', error);
      onError?.(error instanceof Error ? error : new Error('Failed to parse message'));
    }
  }, [addLog, onMessage, onStatusChange, onError, updateCircuitState]);

  // Send heartbeat/ping
  const sendHeartbeat = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      lastPingRef.current = Date.now();
      wsRef.current.send(JSON.stringify({
        type: 'COMMAND',
        payload: { action: 'PING' },
        timestamp: Date.now(),
      }));
    }
  }, []);

  // Flush message queue
  const flushQueue = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      while (messageQueueRef.current.length > 0) {
        const cmd = messageQueueRef.current.shift();
        if (cmd) {
          wsRef.current.send(JSON.stringify({
            type: 'COMMAND',
            payload: cmd,
            timestamp: Date.now(),
            requestId: `cmd_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          }));
        }
      }
    }
  }, []);

  // Connect to WebSocket
  const connect = useCallback(() => {
    // Check circuit breaker
    if (!circuitRef.current.canAttempt()) {
      updateConnectionState('CIRCUIT_OPEN');
      updateCircuitState();
      return;
    }

    // Clean up existing connection
    if (wsRef.current) {
      wsRef.current.close();
    }

    updateConnectionState('CONNECTING');

    try {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log('[TRINITY_WS] Connected');
        updateConnectionState('CONNECTED');
        reconnectCountRef.current = 0;
        circuitRef.current.recordSuccess();
        updateCircuitState();

        setMetrics(prev => ({
          ...prev,
          lastConnected: Date.now(),
          reconnectAttempts: 0,
        }));

        // Start heartbeat
        heartbeatRef.current = setInterval(sendHeartbeat, heartbeatInterval);

        // Flush queued messages
        flushQueue();

        // Request initial status
        ws.send(JSON.stringify({
          type: 'COMMAND',
          payload: { action: 'GET_STATUS' },
          timestamp: Date.now(),
        }));
      };

      ws.onmessage = handleMessage;

      ws.onerror = (event) => {
        console.error('[TRINITY_WS] Error:', event);
        circuitRef.current.recordFailure();
        updateCircuitState();
        onError?.(new Error('WebSocket error'));
      };

      ws.onclose = (event) => {
        console.log('[TRINITY_WS] Closed:', event.code, event.reason);

        // Clear heartbeat
        if (heartbeatRef.current) {
          clearInterval(heartbeatRef.current);
          heartbeatRef.current = null;
        }

        // Attempt reconnection if not intentional close
        if (event.code !== 1000 && reconnectCountRef.current < reconnectAttempts) {
          if (circuitRef.current.canAttempt()) {
            updateConnectionState('RECONNECTING');
            reconnectCountRef.current++;

            setMetrics(prev => ({
              ...prev,
              reconnectAttempts: reconnectCountRef.current,
            }));

            // Exponential backoff with jitter
            const delay = reconnectBaseDelay * Math.pow(2, reconnectCountRef.current - 1);
            const jitter = Math.random() * 1000;

            reconnectTimeoutRef.current = setTimeout(() => {
              connect();
            }, delay + jitter);
          } else {
            updateConnectionState('CIRCUIT_OPEN');
          }
        } else {
          updateConnectionState('DISCONNECTED');
        }
      };

      wsRef.current = ws;

    } catch (error) {
      console.error('[TRINITY_WS] Connection failed:', error);
      circuitRef.current.recordFailure();
      updateCircuitState();
      updateConnectionState('DISCONNECTED');
      onError?.(error instanceof Error ? error : new Error('Connection failed'));
    }
  }, [
    url,
    handleMessage,
    sendHeartbeat,
    flushQueue,
    heartbeatInterval,
    reconnectAttempts,
    reconnectBaseDelay,
    updateConnectionState,
    updateCircuitState,
    onError,
  ]);

  // Disconnect
  const disconnect = useCallback(() => {
    // Clear timers
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // Close socket
    if (wsRef.current) {
      wsRef.current.close(1000, 'User disconnected');
      wsRef.current = null;
    }

    updateConnectionState('DISCONNECTED');
  }, [updateConnectionState]);

  // Send command
  const sendCommand = useCallback(async (command: TrinityCommand): Promise<boolean> => {
    const message: TrinityMessage = {
      type: 'COMMAND',
      payload: command,
      timestamp: Date.now(),
      requestId: `cmd_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    };

    // If connected, send immediately
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
      setMetrics(prev => ({
        ...prev,
        messagesSent: prev.messagesSent + 1,
      }));
      return true;
    }

    // If circuit is open, reject
    if (!circuitRef.current.canAttempt()) {
      onError?.(new Error('Circuit breaker is open - too many failures'));
      return false;
    }

    // Queue for later
    messageQueueRef.current.push(command);

    // Attempt connection if not already connecting
    if (connectionState === 'DISCONNECTED') {
      connect();
    }

    return false;
  }, [connectionState, connect, onError]);

  // Clear logs
  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  // Reset circuit breaker
  const resetCircuit = useCallback(() => {
    circuitRef.current.reset();
    updateCircuitState();
    if (connectionState === 'CIRCUIT_OPEN') {
      updateConnectionState('DISCONNECTED');
    }
  }, [connectionState, updateConnectionState, updateCircuitState]);

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount/unmount

  return {
    connectionState,
    circuitState,
    status,
    logs,
    sendCommand,
    connect,
    disconnect,
    clearLogs,
    resetCircuit,
    metrics,
  };
}

// ============================================================================
// MOCK/DEMO MODE HOOK (for development without backend)
// ============================================================================

export function useTrinitySocketMock(): UseTrinitySocketReturn {
  const [connectionState, setConnectionState] = useState<ConnectionState>('DISCONNECTED');
  const [logs, setLogs] = useState<TrinityLogEntry[]>([]);
  const [status, setStatus] = useState<TrinityStatus | null>(null);

  const connect = useCallback(() => {
    setConnectionState('CONNECTING');
    setTimeout(() => {
      setConnectionState('CONNECTED');
      setStatus({
        orchestratorOnline: true,
        activeJobs: 0,
        queueDepth: 0,
        agents: {
          trendScout: 'REAL',
          marketIntel: 'REAL',
          competitor: 'STUB',
        },
        systemHealth: 'HEALTHY',
      });
    }, 500);
  }, []);

  const disconnect = useCallback(() => {
    setConnectionState('DISCONNECTED');
    setStatus(null);
  }, []);

  const sendCommand = useCallback(async (command: TrinityCommand): Promise<boolean> => {
    if (command.action === 'START_CYCLE') {
      // Simulate production cycle
      const mockSequence: Array<{ delay: number; log: TrinityLogEntry }> = [
        { delay: 500, log: { level: 'INFO', agent: 'TRINITY', message: 'Initializing production cycle...', timestamp: Date.now() }},
        { delay: 1500, log: { level: 'INFO', agent: 'SCOUT', message: `Scanning market trends for "${command.params?.niche || 'target'}"...`, timestamp: Date.now() + 1500 }},
        { delay: 3000, log: { level: 'INFO', agent: 'SCOUT', message: 'Indexing 42 competitor data points', timestamp: Date.now() + 3000 }},
        { delay: 4000, log: { level: 'INFO', agent: 'SPY', message: 'Analyzing ad spend vectors...', timestamp: Date.now() + 4000 }},
        { delay: 5500, log: { level: 'INFO', agent: 'INTEL', message: 'Market intelligence synthesis complete', timestamp: Date.now() + 5500 }},
        { delay: 7000, log: { level: 'INFO', agent: 'RAGNAROK', message: 'Video generation models engaged (VEO-3.1)', timestamp: Date.now() + 7000 }},
        { delay: 9000, log: { level: 'INFO', agent: 'RAGNAROK', message: 'Asset assembly complete. Rendering...', timestamp: Date.now() + 9000 }},
        { delay: 10500, log: { level: 'SUCCESS', agent: 'TRINITY', message: 'Production cycle finished successfully', timestamp: Date.now() + 10500 }},
      ];

      mockSequence.forEach(({ delay, log }) => {
        setTimeout(() => {
          setLogs(prev => [...prev, log]);
        }, delay);
      });

      return true;
    }
    return true;
  }, []);

  const clearLogs = useCallback(() => setLogs([]), []);
  const resetCircuit = useCallback(() => {}, []);

  // Auto-connect
  useEffect(() => {
    connect();
    return () => disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    connectionState,
    circuitState: 'CLOSED',
    status,
    logs,
    sendCommand,
    connect,
    disconnect,
    clearLogs,
    resetCircuit,
    metrics: {
      latency: 45,
      messagesReceived: 0,
      messagesSent: 0,
      reconnectAttempts: 0,
      lastConnected: Date.now(),
    },
  };
}

export default useTrinitySocket;
