import { useState, useRef, useEffect } from 'react';
import type { PromoMessage, ChatSession } from '../types';
import { INITIAL_MESSAGES, AI_PROMO_RESPONSE, SEED_SESSIONS } from '../data/constants';

const NEW_SESSION_ID = 'session-new';

// Derive a meaningful topic name from the user's first message
function deriveTopicName(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('burger'))   return 'Burger Promo';
  if (lower.includes('pizza'))    return 'Pizza Deal';
  if (lower.includes('chicken'))  return 'Chicken Offer';
  if (lower.includes('lunch'))    return 'Lunch Deals';
  if (lower.includes('dinner'))   return 'Dinner Special';
  if (lower.includes('weekend'))  return 'Weekend Promo';
  if (lower.includes('tuesday') || lower.includes('wednesday') || lower.includes('monday')) return 'Midweek Boost';
  if (lower.includes('family'))   return 'Family Feast';
  if (lower.includes('student'))  return 'Student Deal';
  if (lower.includes('social') || lower.includes('instagram') || lower.includes('post')) return 'Social Post';
  if (lower.includes('discount') || lower.includes('offer') || lower.includes('%')) return 'Discount Promo';
  if (lower.includes('customer')) return 'Customer Win-Back';
  if (lower.includes('weather') || lower.includes('rain')) return 'Weather Promo';
  // Fallback: capitalise first 22 chars
  return text.slice(0, 22).replace(/\s+\S*$/, '') || 'New Chat';
}

function makeNewSession(): ChatSession {
  return {
    id: NEW_SESSION_ID,
    name: 'New Chat',
    preview: 'Start a new conversation',
    messages: INITIAL_MESSAGES,
  };
}

export function usePromoChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([
    ...SEED_SESSIONS,
    makeNewSession(),
  ]);
  const [activeId, setActiveId] = useState<string>(NEW_SESSION_ID);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find(s => s.id === activeId) ?? sessions[sessions.length - 1];
  const messages = activeSession.messages;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (overrideInput?: string) => {
    const text = (overrideInput ?? input).trim();
    if (!text) return;

    const userMsg: PromoMessage = { id: Date.now().toString(), role: 'user', content: text, type: 'text' };
    const currentId = activeId;

    setSessions(prev => prev.map(s => {
      if (s.id !== currentId) return s;
      // Auto-name on first user message
      const isFirstUserMsg = s.messages.every(m => m.role !== 'user');
      return {
        ...s,
        messages: [...s.messages, userMsg],
        preview: text,
        name: (s.name === 'New Chat' && isFirstUserMsg) ? deriveTopicName(text) : s.name,
      };
    }));
    setInput('');

    setTimeout(() => {
      const aiMsg: PromoMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: AI_PROMO_RESPONSE.content,
        type: 'promo-card',
        data: { ...AI_PROMO_RESPONSE.data },
      };
      setSessions(prev => prev.map(s =>
        s.id === currentId ? { ...s, messages: [...s.messages, aiMsg] } : s
      ));
    }, 1000);
  };

  const newSession = () => {
    const id = `session-${Date.now()}`;
    const session: ChatSession = { id, name: 'New Chat', preview: 'Start a new conversation', messages: INITIAL_MESSAGES };
    setSessions(prev => [...prev, session]);
    setActiveId(id);
    setInput('');
  };

  const switchSession = (id: string) => {
    setActiveId(id);
    setInput('');
  };

  const renameSession = (id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setSessions(prev => prev.map(s => s.id === id ? { ...s, name: trimmed } : s));
  };

  const deleteSession = (id: string) => {
    setSessions(prev => {
      const remaining = prev.filter(s => s.id !== id);
      if (remaining.length === 0) {
        const fresh = makeNewSession();
        setActiveId(fresh.id);
        return [fresh];
      }
      if (activeId === id) setActiveId(remaining[remaining.length - 1].id);
      return remaining;
    });
  };

  return { sessions, activeId, messages, input, setInput, scrollRef, handleSend, newSession, switchSession, renameSession, deleteSession };
}
