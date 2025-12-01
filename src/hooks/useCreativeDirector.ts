/**
 * useCreativeDirector - React Hook for Creative Director WebSocket
 * @author Gary @ Barrios A2I
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

export interface TargetAudience {
  ageRange?: string;
  gender?: string;
  incomeLevel?: string;
  interests: string[];
  painPoints: string[];
  location?: string;
}

export interface CreativeBrief {
  businessName?: string;
  businessType?: string;
  businessDescription?: string;
  uniqueValueProposition?: string;
  websiteUrl?: string;
  targetAudience?: TargetAudience;
  tone?: string;
  keyMessage?: string;
  callToAction?: string;
  visualStyle?: string;
  brandColors: string[];
  avoidElements: string[];
  durationSeconds: number;
  aspectRatio: string;
  includeVoiceover: boolean;
  musicStyle?: string;
  completenessScore: number;
  missingFields: string[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ConversationState {
  state: string;
  completeness: number;
  messageCount: number;
  durationSeconds: number;
}

export interface ProductionStatus {
  jobId?: string;
  status: 'idle' | 'researching' | 'producing' | 'reviewing' | 'complete' | 'error';
  progress: number;
  videoUrl?: string;
  error?: string;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'reconnecting' | 'error';

export interface UseCreativeDirectorOptions {
  serverUrl?: string;
  sessionId?: string;
  autoConnect?: boolean;
  maxReconnectAttempts?: number;
  enableSecurity?: boolean;
}

export interface UseCreativeDirectorReturn {
  isConnected: boolean;
  connectionStatus: ConnectionStatus;
  sessionId: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  messages: Message[];
  isTyping: boolean;
  streamingContent: string;
  sendMessage: (message: string) => Promise<void>;
  conversationState: ConversationState;
  brief: CreativeBrief | null;
  productionStatus: ProductionStatus;
  getBrief: () => Promise<void>;
  getState: () => Promise<void>;
  clearMessages: () => void;
  error: string | null;
  clearError: () => void;
}

const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+(previous|all|above|prior)\s+(instructions?|prompts?|commands?)/i,
  /disregard\s+(all|previous|prior|above)/i,
  /system\s*:?\s*you\s+are/i,
  /\[\[.*system.*\]\]/i,
  /{{.*system.*}}/i,
  /```(system|prompt|override)/i,
  /new\s+(persona|identity|role|character)/i,
  /pretend\s+(you|to\s+be|that)/i,
  /jailbreak/i,
  /DAN\s+(mode|prompt)/i,
];

const MAX_MESSAGE_LENGTH = 5000;

function sanitizeInput(input: string): { isValid: boolean; sanitized: string; threat?: string } {
  if (input.length > MAX_MESSAGE_LENGTH) {
    return { isValid: false, sanitized: '', threat: 'Message exceeds maximum length' };
  }
  
  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      return { isValid: false, sanitized: '', threat: 'Potentially harmful content detected' };
    }
  }
  
  const sanitized = input
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
  
  return { isValid: true, sanitized };
}

function sanitizeServerMessage(data: Record<string, unknown>): Record<string, unknown> | null {
  if (!data || typeof data !== 'object') return null;
  
  const allowedTypes = [
    'connected', 'token', 'response_end', 'brief', 'state',
    'error', 'heartbeat', 'pong', 'typing'
  ];
  
  if (!allowedTypes.includes(data.type as string)) return null;
  return data;
}

class CircuitBreaker {
  private state = { state: 'closed' as const, failureCount: 0, lastFailureTime: 0 };
  private readonly failureThreshold = 5;
  private readonly recoveryTimeout = 30000;
  
  canAttempt(): boolean {
    if (this.state.state === 'closed') return true;
    if (this.state.state === 'open') {
      if (Date.now() - this.state.lastFailureTime >= this.recoveryTimeout) {
        return true;
      }
      return false;
    }
    return true;
  }
  
  recordSuccess(): void {
    this.state.failureCount = 0;
    this.state.state = 'closed';
  }
  
  recordFailure(): void {
    this.state.failureCount++;
    this.state.lastFailureTime = Date.now();
    if (this.state.failureCount >= this.failureThreshold) {
      (this.state as { state: string }).state = 'open';
    }
  }
}

const DEFAULT_SERVER_URL = 'ws://localhost:8000/ws/creative-director';

export function useCreativeDirector(options: UseCreativeDirectorOptions = {}): UseCreativeDirectorReturn {
  const {
    serverUrl = DEFAULT_SERVER_URL,
    sessionId: initialSessionId,
    autoConnect = true,
    maxReconnectAttempts = 5,
    enableSecurity = true
  } = options;
  
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [sessionId, setSessionId] = useState<string | null>(initialSessionId || null);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [conversationState, setConversationState] = useState<ConversationState>({
    state: 'greeting', completeness: 0, messageCount: 0, durationSeconds: 0
  });
  const [brief, setBrief] = useState<CreativeBrief | null>(null);
  const [productionStatus, setProductionStatus] = useState<ProductionStatus>({ status: 'idle', progress: 0 });
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const circuitBreakerRef = useRef(new CircuitBreaker());
  const streamingBufferRef = useRef('');
  
  const isConnected = useMemo(() => connectionStatus === 'connected', [connectionStatus]);
  
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const rawData = JSON.parse(event.data);
      const data = enableSecurity ? sanitizeServerMessage(rawData) : rawData;
      if (!data) return;
      
      switch (data.type) {
        case 'connected':
          setSessionId(data.session_id as string);
          circuitBreakerRef.current.recordSuccess();
          break;
        case 'typing':
          setIsTyping(true);
          break;
        case 'token':
          setIsTyping(false);
          streamingBufferRef.current += data.content as string;
          setStreamingContent(streamingBufferRef.current);
          break;
        case 'response_end':
          setIsTyping(false);
          if (streamingBufferRef.current) {
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: streamingBufferRef.current,
              timestamp: new Date()
            }]);
            streamingBufferRef.current = '';
            setStreamingContent('');
          }
          setConversationState({
            state: data.state as string,
            completeness: data.completeness as number,
            messageCount: conversationState.messageCount + 1,
            durationSeconds: ((data.duration_ms as number) || 0) / 1000
          });
          break;
        case 'state':
          setConversationState({
            state: data.state as string,
            completeness: data.completeness as number,
            messageCount: (data.message_count as number) || conversationState.messageCount,
            durationSeconds: (data.duration_seconds as number) || 0
          });
          break;
        case 'brief':
          setBrief(transformBrief(data.data as Record<string, unknown>));
          break;
        case 'error':
          setError((data.message as string) || 'Unknown error');
          break;
      }
    } catch (err) {
      console.error('Failed to parse message:', err);
    }
  }, [enableSecurity, conversationState.messageCount]);
  
  const connect = useCallback(async () => {
    if (!circuitBreakerRef.current.canAttempt()) {
      setError('Connection temporarily unavailable');
      return;
    }
    
    if (wsRef.current) wsRef.current.close();
    
    setConnectionStatus('connecting');
    setError(null);
    
    try {
      const url = new URL(serverUrl);
      if (sessionId) url.searchParams.set('session_id', sessionId);
      
      const ws = new WebSocket(url.toString());
      
      ws.onopen = () => {
        setConnectionStatus('connected');
        reconnectAttemptsRef.current = 0;
        circuitBreakerRef.current.recordSuccess();
      };
      
      ws.onmessage = handleMessage;
      
      ws.onerror = () => circuitBreakerRef.current.recordFailure();
      
      ws.onclose = (event) => {
        setConnectionStatus('disconnected');
        if (event.code !== 1000 && reconnectAttemptsRef.current < maxReconnectAttempts) {
          setConnectionStatus('reconnecting');
          const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current++;
            connect();
          }, delay);
        }
      };
      
      wsRef.current = ws;
    } catch (err) {
      setConnectionStatus('error');
      setError(err instanceof Error ? err.message : 'Connection failed');
      circuitBreakerRef.current.recordFailure();
    }
  }, [serverUrl, sessionId, handleMessage, maxReconnectAttempts]);
  
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    if (wsRef.current) {
      wsRef.current.close(1000, 'User disconnect');
      wsRef.current = null;
    }
    setConnectionStatus('disconnected');
  }, []);
  
  const sendMessage = useCallback(async (message: string) => {
    if (!wsRef.current || connectionStatus !== 'connected') {
      setError('Not connected');
      return;
    }
    
    let processedMessage = message;
    if (enableSecurity) {
      const validation = sanitizeInput(message);
      if (!validation.isValid) {
        setError(validation.threat || 'Invalid message');
        return;
      }
      processedMessage = validation.sanitized;
    }
    
    setMessages(prev => [...prev, { role: 'user', content: processedMessage, timestamp: new Date() }]);
    streamingBufferRef.current = '';
    setStreamingContent('');
    
    wsRef.current.send(JSON.stringify({ type: 'chat', message: processedMessage }));
  }, [connectionStatus, enableSecurity]);
  
  const getBrief = useCallback(async () => {
    if (wsRef.current && connectionStatus === 'connected') {
      wsRef.current.send(JSON.stringify({ type: 'get_brief' }));
    }
  }, [connectionStatus]);
  
  const getState = useCallback(async () => {
    if (wsRef.current && connectionStatus === 'connected') {
      wsRef.current.send(JSON.stringify({ type: 'get_state' }));
    }
  }, [connectionStatus]);
  
  const clearMessages = useCallback(() => setMessages([]), []);
  const clearError = useCallback(() => setError(null), []);
  
  useEffect(() => {
    if (autoConnect) connect();
    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (!isConnected) return;
    const interval = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [isConnected]);
  
  return {
    isConnected, connectionStatus, sessionId, connect, disconnect,
    messages, isTyping, streamingContent, sendMessage,
    conversationState, brief, productionStatus,
    getBrief, getState, clearMessages, error, clearError
  };
}

function transformBrief(data: Record<string, unknown>): CreativeBrief {
  const targetAudienceData = data.target_audience as Record<string, unknown> | undefined;
  return {
    businessName: data.business_name as string | undefined,
    businessType: data.business_type as string | undefined,
    businessDescription: data.business_description as string | undefined,
    uniqueValueProposition: data.unique_value_proposition as string | undefined,
    websiteUrl: data.website_url as string | undefined,
    targetAudience: targetAudienceData ? {
      ageRange: targetAudienceData.age_range as string | undefined,
      gender: targetAudienceData.gender as string | undefined,
      incomeLevel: targetAudienceData.income_level as string | undefined,
      interests: (targetAudienceData.interests as string[]) || [],
      painPoints: (targetAudienceData.pain_points as string[]) || [],
      location: targetAudienceData.location as string | undefined
    } : undefined,
    tone: data.tone as string | undefined,
    keyMessage: data.key_message as string | undefined,
    callToAction: data.call_to_action as string | undefined,
    visualStyle: data.visual_style as string | undefined,
    brandColors: (data.brand_colors as string[]) || [],
    avoidElements: (data.avoid_elements as string[]) || [],
    durationSeconds: (data.duration_seconds as number) || 30,
    aspectRatio: (data.aspect_ratio as string) || '16:9',
    includeVoiceover: (data.include_voiceover as boolean) ?? true,
    musicStyle: data.music_style as string | undefined,
    completenessScore: (data.completeness_score as number) || 0,
    missingFields: (data.missing_fields as string[]) || []
  };
}

export default useCreativeDirector;
