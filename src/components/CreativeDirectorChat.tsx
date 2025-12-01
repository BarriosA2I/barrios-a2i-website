'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCreativeDirector, Message, CreativeBrief } from '@/hooks/useCreativeDirector';

interface CreativeDirectorChatProps {
  serverUrl?: string;
  sessionId?: string;
  onBriefComplete?: (brief: CreativeBrief) => void;
  className?: string;
}

export function CreativeDirectorChat({
  serverUrl,
  sessionId,
  onBriefComplete,
  className = ''
}: CreativeDirectorChatProps) {
  const {
    isConnected,
    connectionStatus,
    messages,
    isTyping,
    streamingContent,
    sendMessage,
    conversationState,
    brief,
    error,
    clearError
  } = useCreativeDirector({ serverUrl, sessionId, autoConnect: true, enableSecurity: true });

  const [inputValue, setInputValue] = useState('');
  const [showBrief, setShowBrief] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  useEffect(() => {
    if (brief && brief.completenessScore >= 0.7 && onBriefComplete) {
      onBriefComplete(brief);
    }
  }, [brief, onBriefComplete]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const message = inputValue.trim();
    if (!message || !isConnected) return;
    setInputValue('');
    await sendMessage(message);
  }, [inputValue, isConnected, sendMessage]);

  const getStateLabel = (state: string): string => {
    const labels: Record<string, string> = {
      greeting: 'Getting Started',
      discovery: 'Learning About Your Business',
      audience: 'Understanding Your Audience',
      creative: 'Creative Direction',
      refinement: 'Refining Details',
      confirmation: 'Confirming Your Vision',
      research: 'Gathering Market Intelligence',
      production: 'Creating Your Commercial',
      review: 'Ready for Review',
      complete: 'Complete!'
    };
    return labels[state] || state;
  };

  const getProgressPercentage = (): number => {
    const stateProgress: Record<string, number> = {
      greeting: 5, discovery: 20, audience: 35, creative: 50,
      refinement: 60, confirmation: 70, research: 80, production: 90, review: 95, complete: 100
    };
    return stateProgress[conversationState.state] || 0;
  };

  return (
    <div className={`flex flex-col h-full bg-gray-900 text-gray-100 rounded-2xl border border-cyan-900/30 overflow-hidden ${className}`}>
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-cyan-900/30 bg-gray-900/95">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-lg font-bold">CD</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Creative Director AI</h1>
            <p className="text-xs text-gray-400">{getStateLabel(conversationState.state)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500' :
            connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
          }`} />
          <span className="text-xs text-gray-400 capitalize">{connectionStatus}</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-4 py-2 bg-gray-800/50">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400">Progress</span>
          <span className="text-xs text-cyan-400">{Math.round(conversationState.completeness * 100)}% Complete</span>
        </div>
        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !isTyping && (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center mb-6">
              <span className="text-4xl">🎬</span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Welcome to RAGNAROK Studio</h2>
            <p className="text-gray-400 max-w-md">
              I&apos;m your Creative Director. Tell me about your business and we&apos;ll create a stunning commercial together.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}

        {streamingContent && (
          <MessageBubble message={{ role: 'assistant', content: streamingContent, timestamp: new Date(), isStreaming: true }} />
        )}

        {isTyping && !streamingContent && (
          <div className="flex items-center gap-2 text-gray-400">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm">Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Brief Panel */}
      {brief && showBrief && (
        <div className="border-t border-cyan-900/30 bg-gray-800/50 max-h-64 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-cyan-400">Creative Brief</h3>
            <button onClick={() => setShowBrief(false)} className="text-gray-400 hover:text-white text-sm">Hide</button>
          </div>
          <BriefSummary brief={brief} />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mx-4 mb-2 p-3 bg-red-900/30 border border-red-700/50 rounded-lg flex items-center justify-between">
          <span className="text-red-400 text-sm">{error}</span>
          <button onClick={clearError} className="text-red-400 hover:text-red-300">✕</button>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-cyan-900/30 bg-gray-900">
        <div className="flex gap-2">
          {brief && brief.completenessScore > 0 && (
            <button
              type="button"
              onClick={() => setShowBrief(!showBrief)}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                showBrief ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400'
              }`}
            >
              📋
            </button>
          )}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isConnected ? "Tell me about your business..." : "Connecting..."}
            disabled={!isConnected}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!isConnected || !inputValue.trim() || isTyping}
            className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg font-medium text-white hover:from-cyan-500 hover:to-purple-500 disabled:opacity-50 transition-all"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        isUser ? 'bg-gradient-to-br from-cyan-600 to-cyan-700 text-white' : 'bg-gray-800 text-gray-100 border border-gray-700'
      }`}>
        <p className="whitespace-pre-wrap">{message.content}</p>
        {message.isStreaming && <span className="inline-block w-1 h-4 ml-1 bg-cyan-400 animate-pulse" />}
        <p className={`text-xs mt-1 ${isUser ? 'text-cyan-200' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}

function BriefSummary({ brief }: { brief: CreativeBrief }) {
  const fields = [
    { label: 'Business', value: brief.businessName },
    { label: 'Industry', value: brief.businessType },
    { label: 'Tone', value: brief.tone },
    { label: 'Key Message', value: brief.keyMessage },
    { label: 'Call to Action', value: brief.callToAction },
  ];
  
  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      {fields.map(({ label, value }) => (
        <div key={label}>
          <span className="text-gray-500 text-xs">{label}</span>
          <span className={`block ${value ? 'text-white' : 'text-gray-600'}`}>{value || '—'}</span>
        </div>
      ))}
      {brief.missingFields.length > 0 && (
        <div className="col-span-2 mt-2 pt-2 border-t border-gray-700">
          <span className="text-xs text-amber-400">Still needed: {brief.missingFields.join(', ')}</span>
        </div>
      )}
    </div>
  );
}

export default CreativeDirectorChat;
