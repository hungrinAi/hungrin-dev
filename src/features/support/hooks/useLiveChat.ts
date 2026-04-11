import { useState, useRef } from 'react';
import type { ChatMessage } from '../types';
import { AGENT_REPLIES, INITIAL_CHAT_MESSAGE } from '../data/constants';

export function useLiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_CHAT_MESSAGE]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    scrollToBottom();

    setTimeout(() => {
      const reply = AGENT_REPLIES[Math.floor(Math.random() * AGENT_REPLIES.length)];
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'agent', text: reply },
      ]);
      setTyping(false);
      scrollToBottom();
    }, 1200);
  };

  return { messages, input, setInput, typing, bottomRef, send };
}
