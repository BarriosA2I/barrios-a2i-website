'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// =============================================================================
// DATA STREAM - S+++ PRODUCTION
// =============================================================================
// Live metrics display with animated counters and data ticker
// Creates sense of real-time activity and system intelligence
// =============================================================================

// --- ANIMATED COUNTER ---
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef<number>(0);
  const startValue = useRef<number>(0);

  useEffect(() => {
    startTime.current = Date.now();
    startValue.current = displayValue;

    const animate = () => {
      const elapsed = Date.now() - startTime.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Easing function (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = startValue.current + (value - startValue.current) * eased;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  const formattedValue = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toLocaleString();

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

// --- DATA TICKER ---
interface TickerItem {
  id: string;
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

interface DataTickerProps {
  items: TickerItem[];
  speed?: number;
  className?: string;
}

export function DataTicker({
  items,
  speed = 30,
  className = '',
}: DataTickerProps) {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Duplicate items for seamless loop
  const displayItems = [...items, ...items];

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <motion.div
        className="inline-flex gap-8"
        animate={{ x: -offset }}
        transition={{ duration: 0, ease: 'linear' }}
        style={{
          // Reset when scrolled past first set
          x: -(offset % (items.length * 200)),
        }}
      >
        {displayItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
          >
            <span className="text-slate-400 text-sm">{item.label}</span>
            <span
              className="font-mono font-bold"
              style={{ color: item.color || '#00D4FF' }}
            >
              {item.value}
            </span>
            {item.trend && (
              <span
                className={`text-xs ${
                  item.trend === 'up'
                    ? 'text-green-400'
                    : item.trend === 'down'
                    ? 'text-red-400'
                    : 'text-slate-400'
                }`}
              >
                {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// --- LIVE FEED ---
interface FeedItem {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  timestamp: Date;
}

interface LiveFeedProps {
  items: FeedItem[];
  maxItems?: number;
  className?: string;
}

export function LiveFeed({
  items,
  maxItems = 5,
  className = '',
}: LiveFeedProps) {
  const typeStyles = {
    success: 'border-green-500/30 bg-green-500/5 text-green-400',
    info: 'border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan',
    warning: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
    error: 'border-red-500/30 bg-red-500/5 text-red-400',
  };

  const typeIcons = {
    success: '✓',
    info: 'ℹ',
    warning: '⚠',
    error: '✕',
  };

  const displayItems = items.slice(0, maxItems);

  return (
    <div className={`space-y-2 ${className}`}>
      <AnimatePresence mode="popLayout">
        {displayItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg border ${typeStyles[item.type]}`}
          >
            <span className="text-lg">{typeIcons[item.type]}</span>
            <span className="flex-1 text-sm font-mono">{item.message}</span>
            <span className="text-xs opacity-50">
              {item.timestamp.toLocaleTimeString()}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// --- METRICS GRID ---
interface Metric {
  label: string;
  value: number;
  unit?: string;
  icon?: React.ReactNode;
  color?: string;
  trend?: number; // percentage change
}

interface MetricsGridProps {
  metrics: Metric[];
  columns?: number;
  className?: string;
}

export function MetricsGrid({
  metrics,
  columns = 4,
  className = '',
}: MetricsGridProps) {
  return (
    <div
      className={`grid gap-4 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative p-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden group hover:border-cyber-cyan/30 transition-colors"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
            style={{
              background: `radial-gradient(circle at center, ${metric.color || '#00D4FF'} 0%, transparent 70%)`,
            }}
          />

          <div className="relative">
            {/* Icon */}
            {metric.icon && (
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{
                  background: `${metric.color || '#00D4FF'}20`,
                  color: metric.color || '#00D4FF',
                }}
              >
                {metric.icon}
              </div>
            )}

            {/* Value */}
            <div className="flex items-baseline gap-1">
              <AnimatedCounter
                value={metric.value}
                className="text-3xl font-bold text-white"
              />
              {metric.unit && (
                <span className="text-slate-400 text-sm">{metric.unit}</span>
              )}
            </div>

            {/* Label */}
            <div className="text-slate-400 text-sm mt-1">{metric.label}</div>

            {/* Trend */}
            {metric.trend !== undefined && (
              <div
                className={`text-xs mt-2 ${
                  metric.trend >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {metric.trend >= 0 ? '↑' : '↓'} {Math.abs(metric.trend)}%
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// --- STATUS INDICATOR ---
interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'processing' | 'warning';
  label?: string;
  className?: string;
}

export function StatusIndicator({
  status,
  label,
  className = '',
}: StatusIndicatorProps) {
  const statusStyles = {
    online: { color: '#10B981', label: 'Online' },
    offline: { color: '#EF4444', label: 'Offline' },
    processing: { color: '#00D4FF', label: 'Processing' },
    warning: { color: '#F59E0B', label: 'Warning' },
  };

  const config = statusStyles[status];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: config.color }}
        animate={
          status === 'processing'
            ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }
            : { scale: 1 }
        }
        transition={{
          duration: 1,
          repeat: status === 'processing' ? Infinity : 0,
        }}
      />
      <span className="text-sm text-slate-300">{label || config.label}</span>
    </div>
  );
}

export default {
  AnimatedCounter,
  DataTicker,
  LiveFeed,
  MetricsGrid,
  StatusIndicator,
};
