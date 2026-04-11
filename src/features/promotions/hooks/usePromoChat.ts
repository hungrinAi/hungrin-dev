import { useState, useRef, useEffect } from 'react';
import type { PromoMessage, ChatSession } from '../types';
import { INITIAL_MESSAGES, AI_PROMO_RESPONSE, SEED_SESSIONS } from '../data/constants';

const NEW_SESSION_ID = 'session-new';

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

  const updateMessages = (id: string, updater: (prev: PromoMessage[]) => PromoMessage[]) => {
    setSessions(prev => prev.map(s =>
      s.id === id
        ? { ...s, messages: updater(s.messages), preview: updater(s.messages).filter(m => m.role === 'user').at(-1)?.content ?? s.preview }
        : s
    ));
  };

  const handleSend = (overrideInput?: string) => {
    const text = (overrideInput ?? input).trim();
    if (!text) return;

    const userMsg: PromoMessage = { id: Date.now().toString(), role: 'user', content: text, type: 'text' };
    const currentId = activeId;

    setSessions(prev => prev.map(s =>
      s.id === currentId
        ? { ...s, messages: [...s.messages, userMsg], preview: text, name: s.name === 'New Chat' ? text.slice(0, 24) : s.name }
        : s
    ));
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

  return { sessions, activeId, messages, input, setInput, scrollRef, handleSend, newSession, switchSession, deleteSession };
}
