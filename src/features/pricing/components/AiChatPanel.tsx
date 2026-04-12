'use client';

import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { AiMessage } from '../types';

interface AiChatPanelProps {
  messages: AiMessage[];
  onClose: () => void;
}

export function AiChatPanel({ messages, onClose }: AiChatPanelProps) {
  return (
    <Card className="p-5 space-y-3 border-g-dark/20">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-g-dark flex items-center gap-1.5">
          <MessageCircle className="w-3.5 h-3.5" /> AI Plan Assistant
        </p>
        <button
          onClick={onClose}
          className="p-1 text-text-muted hover:text-text-dark rounded-lg transition-all"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="space-y-3 max-h-48 overflow-y-auto">
        {messages.map(m => (
          <div key={m.id} className={cn('flex gap-2', m.role === 'user' ? 'flex-row-reverse' : '')}>
            <div
              className={cn(
                'px-3 py-2 rounded-2xl text-xs leading-relaxed max-w-[85%]',
                m.role === 'assistant'
                  ? 'bg-g-faint border border-border-light text-text-dark'
                  : 'bg-g-dark text-white',
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
