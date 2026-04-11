import { useState } from 'react';
import type { AiMessage } from '../types';
import { getAiReply } from '../data/constants';

export function usePricingChat() {
  const [chatInput, setChatInput] = useState('');
  const [aiMessages, setAiMessages] = useState<AiMessage[]>([]);
  const [showChat, setShowChat] = useState(false);

  const sendChat = (overrideText?: string) => {
    const text = (overrideText ?? chatInput).trim();
    if (!text) return;

    const userMsg: AiMessage = { id: Date.now().toString(), role: 'user', text };
    const reply: AiMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: getAiReply(text),
    };

    setAiMessages(prev => [...prev, userMsg, reply]);
    setChatInput('');
    setShowChat(true);
  };

  const clearChat = () => {
    setShowChat(false);
    setAiMessages([]);
  };

  return { chatInput, setChatInput, aiMessages, showChat, sendChat, clearChat };
}
