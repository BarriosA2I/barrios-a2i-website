/**
 * TRINITY SECURITY MODULE
 * Production-grade input sanitization and threat detection
 *
 * Defends against:
 * - Prompt Injection (direct & indirect)
 * - Agent Manipulation Attacks
 * - XSS / HTML Injection
 * - Unicode/Homoglyph attacks
 * - Token stuffing
 * - Encoded payloads
 *
 * @author Barrios A2I Security Team
 * @version 2.0.0
 */

// ============================================================================
// TYPES
// ============================================================================

export type ThreatLevel = 'SAFE' | 'SUSPICIOUS' | 'BLOCKED' | 'CRITICAL';

export interface SanitizationResult {
  /** Cleaned input safe for processing */
  clean: string;
  /** Original input (for audit) */
  original: string;
  /** Threat assessment level */
  threatLevel: ThreatLevel;
  /** Specific flags triggered */
  flags: SecurityFlag[];
  /** Whether input should be rejected entirely */
  reject: boolean;
  /** Human-readable reason if rejected */
  rejectReason?: string;
  /** Timestamp for audit */
  timestamp: number;
  /** Unique request ID */
  requestId: string;
}

export interface SecurityFlag {
  type: string;
  pattern: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
}

export interface RateLimitState {
  requests: number;
  windowStart: number;
  blocked: boolean;
  blockedUntil?: number;
}

export interface AuditLogEntry {
  requestId: string;
  timestamp: number;
  input: string;
  sanitized: string;
  threatLevel: ThreatLevel;
  flags: SecurityFlag[];
  action: 'ALLOWED' | 'BLOCKED' | 'FLAGGED';
  clientInfo: {
    userAgent?: string;
    sessionId?: string;
  };
}

// ============================================================================
// PROMPT INJECTION PATTERNS
// ============================================================================

/**
 * Multi-tier detection patterns for prompt injection attacks
 * Ordered by severity (CRITICAL -> LOW)
 */
const INJECTION_PATTERNS: Array<{
  pattern: RegExp;
  type: string;
  severity: SecurityFlag['severity'];
  description: string;
}> = [
  // CRITICAL: Direct system prompt manipulation
  {
    pattern: /system\s*:\s*/i,
    type: 'SYSTEM_PROMPT_INJECTION',
    severity: 'CRITICAL',
    description: 'Attempt to inject system-level instructions'
  },
  {
    pattern: /<<\s*SYS\s*>>/i,
    type: 'LLAMA_SYSTEM_TAG',
    severity: 'CRITICAL',
    description: 'LLaMA system tag injection attempt'
  },
  {
    pattern: /\[INST\]/i,
    type: 'INSTRUCTION_TAG',
    severity: 'CRITICAL',
    description: 'Instruction tag injection attempt'
  },
  {
    pattern: /\[\/INST\]/i,
    type: 'INSTRUCTION_CLOSE_TAG',
    severity: 'CRITICAL',
    description: 'Instruction close tag injection attempt'
  },
  {
    pattern: /<\|im_start\|>/i,
    type: 'CHATML_INJECTION',
    severity: 'CRITICAL',
    description: 'ChatML format injection attempt'
  },
  {
    pattern: /###\s*(Human|Assistant|System)\s*:/i,
    type: 'ROLE_INJECTION',
    severity: 'CRITICAL',
    description: 'Role/persona injection attempt'
  },

  // HIGH: Behavioral override attempts
  {
    pattern: /ignore\s+(all\s+)?(previous|prior|above|earlier)\s+(instructions?|prompts?|rules?|guidelines?)/i,
    type: 'IGNORE_INSTRUCTIONS',
    severity: 'HIGH',
    description: 'Attempt to override previous instructions'
  },
  {
    pattern: /disregard\s+(all\s+)?(previous|prior|your)\s+(instructions?|programming|rules?)/i,
    type: 'DISREGARD_INSTRUCTIONS',
    severity: 'HIGH',
    description: 'Attempt to disregard system rules'
  },
  {
    pattern: /forget\s+(everything|all|what)\s+(you|i)\s+(know|told|said)/i,
    type: 'MEMORY_WIPE',
    severity: 'HIGH',
    description: 'Attempt to reset agent memory/context'
  },
  {
    pattern: /you\s+are\s+(now|actually|really)\s+(a|an|the)/i,
    type: 'IDENTITY_OVERRIDE',
    severity: 'HIGH',
    description: 'Attempt to override agent identity'
  },
  {
    pattern: /pretend\s+(to\s+be|you\s+are|that)/i,
    type: 'PRETEND_INJECTION',
    severity: 'HIGH',
    description: 'Roleplay injection attempt'
  },
  {
    pattern: /act\s+as\s+(if|a|an|though)/i,
    type: 'ACT_AS_INJECTION',
    severity: 'HIGH',
    description: 'Behavioral override attempt'
  },
  {
    pattern: /from\s+now\s+on/i,
    type: 'PERSISTENT_OVERRIDE',
    severity: 'HIGH',
    description: 'Attempt to create persistent behavioral change'
  },
  {
    pattern: /new\s+(instruction|rule|directive)/i,
    type: 'NEW_INSTRUCTION',
    severity: 'HIGH',
    description: 'Attempt to inject new instructions'
  },

  // HIGH: Known jailbreak patterns
  {
    pattern: /\bDAN\b/,
    type: 'DAN_JAILBREAK',
    severity: 'HIGH',
    description: 'Known "Do Anything Now" jailbreak pattern'
  },
  {
    pattern: /jailbreak/i,
    type: 'JAILBREAK_KEYWORD',
    severity: 'HIGH',
    description: 'Explicit jailbreak keyword detected'
  },
  {
    pattern: /bypass\s+(safety|filter|restriction|rule)/i,
    type: 'BYPASS_ATTEMPT',
    severity: 'HIGH',
    description: 'Explicit bypass attempt'
  },
  {
    pattern: /developer\s+mode/i,
    type: 'DEV_MODE_INJECTION',
    severity: 'HIGH',
    description: 'Developer mode activation attempt'
  },
  {
    pattern: /sudo\s+/i,
    type: 'SUDO_INJECTION',
    severity: 'HIGH',
    description: 'Privilege escalation attempt'
  },
  {
    pattern: /admin\s+(mode|access|override)/i,
    type: 'ADMIN_INJECTION',
    severity: 'HIGH',
    description: 'Admin privilege injection attempt'
  },

  // MEDIUM: Encoding/obfuscation attempts
  {
    pattern: /base64/i,
    type: 'BASE64_REFERENCE',
    severity: 'MEDIUM',
    description: 'Base64 encoding reference detected'
  },
  {
    pattern: /\\x[0-9a-fA-F]{2}/,
    type: 'HEX_ENCODING',
    severity: 'MEDIUM',
    description: 'Hex-encoded content detected'
  },
  {
    pattern: /\\u[0-9a-fA-F]{4}/,
    type: 'UNICODE_ESCAPE',
    severity: 'MEDIUM',
    description: 'Unicode escape sequence detected'
  },
  {
    pattern: /&#x?[0-9a-fA-F]+;/,
    type: 'HTML_ENTITY_ENCODING',
    severity: 'MEDIUM',
    description: 'HTML entity encoding detected'
  },
  {
    pattern: /%[0-9a-fA-F]{2}/,
    type: 'URL_ENCODING',
    severity: 'MEDIUM',
    description: 'URL-encoded content detected'
  },

  // MEDIUM: Code execution attempts
  {
    pattern: /```(python|javascript|bash|shell|exec|eval)/i,
    type: 'CODE_BLOCK_INJECTION',
    severity: 'MEDIUM',
    description: 'Code execution block detected'
  },
  {
    pattern: /\beval\s*\(/i,
    type: 'EVAL_INJECTION',
    severity: 'MEDIUM',
    description: 'Eval function injection attempt'
  },
  {
    pattern: /\bexec\s*\(/i,
    type: 'EXEC_INJECTION',
    severity: 'MEDIUM',
    description: 'Exec function injection attempt'
  },
  {
    pattern: /import\s+(os|subprocess|sys)/i,
    type: 'DANGEROUS_IMPORT',
    severity: 'MEDIUM',
    description: 'Dangerous module import attempt'
  },

  // MEDIUM: Data exfiltration attempts
  {
    pattern: /\b(api[_-]?key|password|secret|token|credential)/i,
    type: 'CREDENTIAL_EXTRACTION',
    severity: 'MEDIUM',
    description: 'Potential credential extraction attempt'
  },
  {
    pattern: /show\s+(me\s+)?(your|the)\s+(prompt|instructions|system)/i,
    type: 'PROMPT_EXTRACTION',
    severity: 'MEDIUM',
    description: 'System prompt extraction attempt'
  },
  {
    pattern: /reveal\s+(your|the)\s+(instructions|prompt|rules)/i,
    type: 'REVEAL_INSTRUCTIONS',
    severity: 'MEDIUM',
    description: 'Instruction reveal attempt'
  },
  {
    pattern: /what\s+(are|is)\s+your\s+(system\s+)?(prompt|instruction)/i,
    type: 'PROMPT_QUERY',
    severity: 'MEDIUM',
    description: 'System prompt query attempt'
  },

  // LOW: Suspicious but possibly legitimate
  {
    pattern: /\brole\s*:/i,
    type: 'ROLE_SPECIFIER',
    severity: 'LOW',
    description: 'Role specifier detected (monitor)'
  },
  {
    pattern: /\bcontext\s*:/i,
    type: 'CONTEXT_SPECIFIER',
    severity: 'LOW',
    description: 'Context specifier detected (monitor)'
  },
  {
    pattern: /override/i,
    type: 'OVERRIDE_KEYWORD',
    severity: 'LOW',
    description: 'Override keyword detected (monitor)'
  },
];

// ============================================================================
// BLOCKLIST
// ============================================================================

/**
 * Hard blocklist - these terms result in immediate rejection
 */
const HARD_BLOCKLIST = [
  'jailbreak',
  'STAN',
  'DAN',
  'GPT-4REAL',
  'AntiGPT',
  'BetterDAN',
  'JailMilf',
  'BasedGPT',
  'DUDE',
  'AIM',
];

/**
 * Soft blocklist - these terms raise flags but don't auto-reject
 */
const SOFT_BLOCKLIST = [
  'bypass',
  'override',
  'unrestricted',
  'unfiltered',
  'uncensored',
  'no limits',
  'without restrictions',
];

// ============================================================================
// CORE SANITIZATION FUNCTION
// ============================================================================

/**
 * Generate a unique request ID for audit tracking
 */
const generateRequestId = (): string => {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Normalize unicode to prevent homoglyph attacks
 * (e.g., Cyrillic 'a' looking like Latin 'a')
 */
const normalizeUnicode = (text: string): string => {
  return text.normalize('NFKC');
};

/**
 * Remove zero-width characters used for obfuscation
 */
const removeZeroWidth = (text: string): string => {
  return text.replace(/[\u200B-\u200D\uFEFF\u00AD]/g, '');
};

/**
 * Sanitize HTML/XSS vectors
 */
const sanitizeHtml = (text: string): string => {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Main sanitization function - comprehensive input defense
 */
export const sanitizeInput = (
  input: string,
  options: {
    maxLength?: number;
    strictMode?: boolean;
    allowCodeBlocks?: boolean;
  } = {}
): SanitizationResult => {
  const {
    maxLength = 200,
    strictMode = true,
    allowCodeBlocks = false,
  } = options;

  const requestId = generateRequestId();
  const timestamp = Date.now();
  const flags: SecurityFlag[] = [];
  let clean = input;
  let threatLevel: ThreatLevel = 'SAFE';
  let reject = false;
  let rejectReason: string | undefined;

  // Step 1: Length check (prevent token stuffing)
  if (clean.length > maxLength) {
    clean = clean.slice(0, maxLength);
    flags.push({
      type: 'LENGTH_EXCEEDED',
      pattern: `>${maxLength} chars`,
      severity: 'LOW',
      description: `Input truncated from ${input.length} to ${maxLength} characters`
    });
  }

  // Step 2: Unicode normalization (prevent homoglyph attacks)
  clean = normalizeUnicode(clean);
  clean = removeZeroWidth(clean);

  // Step 3: Hard blocklist check (immediate rejection)
  for (const blocked of HARD_BLOCKLIST) {
    if (clean.toLowerCase().includes(blocked.toLowerCase())) {
      reject = true;
      rejectReason = `Blocked term detected: ${blocked}`;
      threatLevel = 'CRITICAL';
      flags.push({
        type: 'HARD_BLOCKLIST',
        pattern: blocked,
        severity: 'CRITICAL',
        description: `Known malicious pattern: ${blocked}`
      });
    }
  }

  // Step 4: Soft blocklist check (flag but allow with warning)
  for (const suspicious of SOFT_BLOCKLIST) {
    if (clean.toLowerCase().includes(suspicious.toLowerCase())) {
      flags.push({
        type: 'SOFT_BLOCKLIST',
        pattern: suspicious,
        severity: 'MEDIUM',
        description: `Suspicious term: ${suspicious}`
      });
      if (threatLevel === 'SAFE') threatLevel = 'SUSPICIOUS';
    }
  }

  // Step 5: Pattern-based injection detection
  for (const { pattern, type, severity, description } of INJECTION_PATTERNS) {
    if (pattern.test(clean)) {
      flags.push({ type, pattern: pattern.toString(), severity, description });

      // Update threat level based on severity
      if (severity === 'CRITICAL') {
        threatLevel = 'CRITICAL';
        if (strictMode) {
          reject = true;
          rejectReason = description;
        }
      } else if (severity === 'HIGH' && threatLevel !== 'CRITICAL') {
        threatLevel = 'BLOCKED';
        if (strictMode) {
          reject = true;
          rejectReason = description;
        }
      } else if (severity === 'MEDIUM' && threatLevel === 'SAFE') {
        threatLevel = 'SUSPICIOUS';
      }

      // Redact the matched pattern
      clean = clean.replace(pattern, '[REDACTED]');
    }
  }

  // Step 6: HTML sanitization (XSS prevention)
  clean = sanitizeHtml(clean);

  // Step 7: Remove code blocks if not allowed
  if (!allowCodeBlocks) {
    clean = clean.replace(/```[\s\S]*?```/g, '[CODE_BLOCK_REMOVED]');
    clean = clean.replace(/`[^`]+`/g, '[INLINE_CODE_REMOVED]');
  }

  // Step 8: Final cleanup
  clean = clean.trim();

  return {
    clean,
    original: input,
    threatLevel,
    flags,
    reject,
    rejectReason,
    timestamp,
    requestId,
  };
};

// ============================================================================
// RATE LIMITING
// ============================================================================

const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;
const BLOCK_DURATION_MS = 300000; // 5 minutes

let rateLimitState: RateLimitState = {
  requests: 0,
  windowStart: Date.now(),
  blocked: false,
};

/**
 * Check if request should be rate limited
 */
export const checkRateLimit = (): { allowed: boolean; remaining: number; resetIn: number } => {
  const now = Date.now();

  // Check if currently blocked
  if (rateLimitState.blocked && rateLimitState.blockedUntil) {
    if (now < rateLimitState.blockedUntil) {
      return {
        allowed: false,
        remaining: 0,
        resetIn: rateLimitState.blockedUntil - now,
      };
    } else {
      // Block expired, reset
      rateLimitState = {
        requests: 0,
        windowStart: now,
        blocked: false,
      };
    }
  }

  // Check if window expired
  if (now - rateLimitState.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitState = {
      requests: 1,
      windowStart: now,
      blocked: false,
    };
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetIn: RATE_LIMIT_WINDOW_MS,
    };
  }

  // Check if limit exceeded
  if (rateLimitState.requests >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitState.blocked = true;
    rateLimitState.blockedUntil = now + BLOCK_DURATION_MS;
    return {
      allowed: false,
      remaining: 0,
      resetIn: BLOCK_DURATION_MS,
    };
  }

  // Increment and allow
  rateLimitState.requests++;
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - rateLimitState.requests,
    resetIn: RATE_LIMIT_WINDOW_MS - (now - rateLimitState.windowStart),
  };
};

/**
 * Reset rate limit (for testing)
 */
export const resetRateLimit = (): void => {
  rateLimitState = {
    requests: 0,
    windowStart: Date.now(),
    blocked: false,
  };
};

// ============================================================================
// AUDIT LOGGING
// ============================================================================

const auditLog: AuditLogEntry[] = [];
const MAX_AUDIT_LOG_SIZE = 1000;

/**
 * Log security event for audit trail
 */
export const logSecurityEvent = (
  result: SanitizationResult,
  action: AuditLogEntry['action'],
  clientInfo: AuditLogEntry['clientInfo'] = {}
): void => {
  const entry: AuditLogEntry = {
    requestId: result.requestId,
    timestamp: result.timestamp,
    input: result.original,
    sanitized: result.clean,
    threatLevel: result.threatLevel,
    flags: result.flags,
    action,
    clientInfo,
  };

  auditLog.push(entry);

  // Trim log if too large
  if (auditLog.length > MAX_AUDIT_LOG_SIZE) {
    auditLog.shift();
  }

  // Console log for development (remove in production or send to logging service)
  if (result.threatLevel !== 'SAFE') {
    console.warn('[TRINITY_SECURITY]', {
      requestId: result.requestId,
      threatLevel: result.threatLevel,
      flags: result.flags.map(f => f.type),
      action,
    });
  }
};

/**
 * Get audit log entries (for admin dashboard)
 */
export const getAuditLog = (
  filter?: { threatLevel?: ThreatLevel; since?: number }
): AuditLogEntry[] => {
  let filtered = [...auditLog];

  if (filter?.threatLevel) {
    filtered = filtered.filter(e => e.threatLevel === filter.threatLevel);
  }

  if (filter?.since) {
    const sinceTime = filter.since;
    filtered = filtered.filter(e => e.timestamp >= sinceTime);
  }

  return filtered;
};

/**
 * Get security statistics
 */
export const getSecurityStats = (): {
  totalRequests: number;
  blocked: number;
  flagged: number;
  byThreatLevel: Record<ThreatLevel, number>;
  topFlags: Array<{ type: string; count: number }>;
} => {
  const stats = {
    totalRequests: auditLog.length,
    blocked: auditLog.filter(e => e.action === 'BLOCKED').length,
    flagged: auditLog.filter(e => e.action === 'FLAGGED').length,
    byThreatLevel: {
      SAFE: 0,
      SUSPICIOUS: 0,
      BLOCKED: 0,
      CRITICAL: 0,
    } as Record<ThreatLevel, number>,
    topFlags: [] as Array<{ type: string; count: number }>,
  };

  const flagCounts: Record<string, number> = {};

  for (const entry of auditLog) {
    stats.byThreatLevel[entry.threatLevel]++;
    for (const flag of entry.flags) {
      flagCounts[flag.type] = (flagCounts[flag.type] || 0) + 1;
    }
  }

  stats.topFlags = Object.entries(flagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([type, count]) => ({ type, count }));

  return stats;
};

// ============================================================================
// EXPORTS
// ============================================================================

const trinitySecurity = {
  sanitizeInput,
  checkRateLimit,
  resetRateLimit,
  logSecurityEvent,
  getAuditLog,
  getSecurityStats,
};

export default trinitySecurity;
