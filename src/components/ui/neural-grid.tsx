'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// =============================================================================
// NEURAL GRID - S+++ PRODUCTION
// =============================================================================
// Living neural network background with animated connections
// Data pulses travel between nodes creating organic movement
// =============================================================================

interface NeuralGridProps {
  className?: string;
  nodeCount?: number;
  pulseColor?: string;
  nodeColor?: string;
  lineColor?: string;
  pulseSpeed?: number;
  interactive?: boolean;
}

interface Node {
  id: number;
  x: number;
  y: number;
  connections: number[];
  pulse: boolean;
}

export function NeuralGrid({
  className = '',
  nodeCount = 30,
  pulseColor = '#00D4FF',
  nodeColor = '#1E3A5F',
  lineColor = 'rgba(0,212,255,0.1)',
  pulseSpeed = 2,
  interactive = true,
}: NeuralGridProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activePulses, setActivePulses] = useState<Set<string>>(new Set());

  // Generate nodes and connections
  useEffect(() => {
    const generateNodes = () => {
      const newNodes: Node[] = [];

      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          connections: [],
          pulse: false,
        });
      }

      // Create connections (each node connects to 2-4 nearby nodes)
      newNodes.forEach((node, i) => {
        const distances = newNodes
          .map((other, j) => ({
            index: j,
            distance: Math.hypot(node.x - other.x, node.y - other.y),
          }))
          .filter((d) => d.index !== i)
          .sort((a, b) => a.distance - b.distance);

        // Connect to 2-4 nearest
        const connectionCount = 2 + Math.floor(Math.random() * 3);
        node.connections = distances.slice(0, connectionCount).map((d) => d.index);
      });

      setNodes(newNodes);
    };

    generateNodes();
  }, [nodeCount, dimensions]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Random pulse generation
  useEffect(() => {
    const interval = setInterval(() => {
      if (nodes.length === 0) return;

      // Start pulse from random node
      const startNode = Math.floor(Math.random() * nodes.length);
      const node = nodes[startNode];

      if (node.connections.length > 0) {
        const targetNode = node.connections[Math.floor(Math.random() * node.connections.length)];
        const pulseId = `${startNode}-${targetNode}`;

        setActivePulses((prev) => new Set([...prev, pulseId]));

        // Remove pulse after animation
        setTimeout(() => {
          setActivePulses((prev) => {
            const next = new Set(prev);
            next.delete(pulseId);
            return next;
          });
        }, pulseSpeed * 1000);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [nodes, pulseSpeed]);

  // Mouse interaction
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Find nodes near mouse for highlighting
  const getNodeProximity = (node: Node) => {
    if (!interactive) return 0;
    const distance = Math.hypot(node.x - mousePos.x, node.y - mousePos.y);
    return Math.max(0, 1 - distance / 150);
  };

  return (
    <svg
      ref={svgRef}
      className={`w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      style={{ background: 'transparent' }}
    >
      {/* Connection lines */}
      {nodes.map((node) =>
        node.connections.map((targetIndex) => {
          const target = nodes[targetIndex];
          if (!target) return null;

          const pulseId = `${node.id}-${targetIndex}`;
          const isActive = activePulses.has(pulseId);
          const proximity = Math.max(getNodeProximity(node), getNodeProximity(target));

          return (
            <g key={pulseId}>
              {/* Base line */}
              <line
                x1={node.x}
                y1={node.y}
                x2={target.x}
                y2={target.y}
                stroke={lineColor}
                strokeWidth={1 + proximity * 2}
                style={{
                  transition: 'stroke-width 0.3s ease',
                }}
              />

              {/* Pulse animation */}
              {isActive && (
                <motion.circle
                  r={3}
                  fill={pulseColor}
                  filter="url(#glow)"
                  initial={{ cx: node.x, cy: node.y, opacity: 1 }}
                  animate={{ cx: target.x, cy: target.y, opacity: 0 }}
                  transition={{ duration: pulseSpeed, ease: 'linear' }}
                />
              )}
            </g>
          );
        })
      )}

      {/* Nodes */}
      {nodes.map((node) => {
        const proximity = getNodeProximity(node);
        const size = 3 + proximity * 5;

        return (
          <g key={node.id}>
            {/* Node core */}
            <circle
              cx={node.x}
              cy={node.y}
              r={size}
              fill={nodeColor}
              style={{
                transition: 'r 0.3s ease',
              }}
            />

            {/* Node glow on proximity */}
            {proximity > 0 && (
              <circle
                cx={node.x}
                cy={node.y}
                r={size + 5}
                fill="none"
                stroke={pulseColor}
                strokeWidth={1}
                opacity={proximity * 0.5}
                filter="url(#glow)"
              />
            )}
          </g>
        );
      })}

      {/* Glow filter */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

// --- OVERLAY VERSION ---
// Positioned absolutely to cover parent
export function NeuralGridOverlay(props: NeuralGridProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
      <NeuralGrid {...props} />
    </div>
  );
}

export default NeuralGrid;
