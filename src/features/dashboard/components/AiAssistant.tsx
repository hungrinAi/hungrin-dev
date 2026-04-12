'use client';

import React, { KeyboardEvent } from 'react';
import Image from 'next/image';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { DashboardStats } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { useAiChat } from '../hooks/useAiChat';

interface AiAssistantProps {
  stats?: DashboardStats;
}

export function AiAssistant({ stats }: AiAssistantProps) {
  const { messages, input, setInput, send, sendSuggestion, isTyping, bottomRef } = useAiChat();

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Pick robot image based on conversation state
  const robotSrc = isTyping
    ? '/images/robot-thinking.jpeg'
    : messages.length > 0
    ? '/images/robot-happy.jpeg'
    : '/images/robot-thumbsup.jpeg';

  return (
    <div className="bg-gradient-to-br from-[#e8f8f0] via-[#d4f0e2] to-[#c0e8d4] p-6 rounded-2xl border border-border-light shadow-sm flex flex-col gap-4">

      {/* Header — robot avatar + title + large robot */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 bg-white border border-border-light shadow-md ring-2 ring-g-dark/10 flex items-center justify-center">
          <Image
            src={robotSrc}
            alt="AI Assistant"
            width={48}
            height={48}
            className="w-full h-full object-cover object-center"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-text-dark leading-tight">AI Growth Assistant</p>
          <p className="text-[10px] text-g-dark font-bold flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-g-dark animate-pulse" />
            {isTyping ? 'Thinking…' : 'Online · Ready to help'}
          </p>
        </div>

        <div className="ml-auto" />
      </div>

      {/* Greeting / intro */}
      {messages.length === 0 && (
        <p className="text-sm text-text-dark leading-relaxed">
          <strong>Hello!</strong> I'm your AI Growth Assistant.<br />Ready to boost your sales today?
        </p>
      )}

      {/* Chat thread */}
      {messages.length > 0 && (
        <div className="max-h-44 overflow-y-auto flex flex-col gap-2 pr-1 no-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'text-xs px-3 py-2 rounded-xl max-w-[90%] leading-relaxed',
                msg.role === 'user'
                  ? 'bg-g-dark text-white self-end rounded-br-sm'
                  : 'bg-white/80 text-text-dark self-start rounded-bl-sm border border-border-light shadow-sm'
              )}
            >
              {msg.text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
                part.startsWith('**') && part.endsWith('**')
                  ? <strong key={i}>{part.slice(2, -2)}</strong>
                  : part
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-1.5 px-3 py-2 bg-white/80 border border-border-light rounded-xl rounded-bl-sm self-start shadow-sm">
              <Loader2 className="w-3 h-3 text-g-dark animate-spin" />
              <span className="text-[10px] text-text-muted">AI is thinking…</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Input bar */}
      <div className="flex gap-2 bg-white/70 backdrop-blur p-2 rounded-xl border border-border-light">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask me anything about your restaurant…"
          className="flex-1 bg-transparent border-none outline-none text-sm px-2"
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || isTyping}
          className="bg-g-dark text-white p-2 rounded-lg hover:bg-g-mid transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2">
        {stats?.aiSuggestions.map((a) => (
          <button
            key={a}
            onClick={() => sendSuggestion(a.replace(/^\+\s*/, ''))}
            disabled={isTyping}
            className="px-3 py-1.5 bg-white/60 border border-g-dark/10 rounded-full text-[10px] font-bold text-g-dark hover:bg-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {a}
          </button>
        ))}
      </div>

      {/* Trust signals */}
      <div className="space-y-1">
        {['No contracts', 'Cancel anytime', 'Works with Deliveroo, Uber Eats & Just Eat'].map((f) => (
          <div key={f} className="flex items-center gap-2 text-[10px] text-text-mid font-medium">
            <CheckCircle2 className="w-3 h-3 text-g-dark" /> {f}
          </div>
        ))}
      </div>
    </div>
  );
}
