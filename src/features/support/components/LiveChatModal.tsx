'use client';

import React from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Modal } from '@/src/components/ui/Modal';
import { cn } from '@/src/lib/utils';
import { useLiveChat } from '../hooks/useLiveChat';

interface LiveChatModalProps {
  open: boolean;
  onClose: () => void;
}

export function LiveChatModal({ open, onClose }: LiveChatModalProps) {
  const { messages, input, setInput, typing, bottomRef, send } = useLiveChat();

  return (
    <Modal open={open} onClose={onClose} title="Live Chat Support" size="sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 p-3 bg-g-faint rounded-xl border border-border-light">
          <div className="w-9 h-9 rounded-full bg-g-dark text-white text-sm font-black flex items-center justify-center shrink-0">
            L
          </div>
          <div>
            <p className="text-xs font-bold text-text-dark">Lucy — Support Agent</p>
            <p className="text-[10px] text-g-dark font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-g-dark animate-pulse inline-block" />
              Online now
            </p>
          </div>
        </div>

        <div className="h-52 overflow-y-auto space-y-3 pr-1">
          {messages.map(m => (
            <div key={m.id} className={cn('flex gap-2', m.role === 'user' ? 'flex-row-reverse' : '')}>
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0',
                  m.role === 'agent' ? 'bg-g-dark text-white' : 'bg-gray-200 text-gray-600',
                )}
              >
                {m.role === 'agent' ? 'L' : 'U'}
              </div>
              <div
                className={cn(
                  'max-w-[75%] px-3 py-2 rounded-2xl text-xs leading-relaxed',
                  m.role === 'agent'
                    ? 'bg-g-faint text-text-dark border border-border-light'
                    : 'bg-g-dark text-white',
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-2 items-center">
              <div className="w-7 h-7 rounded-full bg-g-dark text-white text-xs font-black flex items-center justify-center shrink-0">
                L
              </div>
              <div className="bg-g-faint border border-border-light rounded-2xl px-3 py-2">
                <Loader2 className="w-3.5 h-3.5 text-text-muted animate-spin" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="flex gap-2 border-t border-border-light pt-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Type a message…"
            className="flex-1 bg-g-faint border border-border-light rounded-xl px-3 py-2 text-xs outline-none focus:border-g-dark transition-all"
          />
          <button
            onClick={send}
            className="bg-g-dark text-white p-2 rounded-xl hover:bg-g-mid transition-all shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
