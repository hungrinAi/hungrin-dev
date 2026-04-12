import { useState, useRef, useCallback, useEffect } from 'react';
import { AI_RESPONSES, DEFAULT_AI_REPLY } from '../data/constants';

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

function getMockReply(input: string): string {
  const lower = input.toLowerCase();
  const match = AI_RESPONSES.find(({ keywords }) =>
    keywords.some((k) => lower.includes(k))
  );
  return match?.reply ?? DEFAULT_AI_REPLY;
}

export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const send = useCallback((text?: string) => {
    const message = (text ?? input).trim();
    if (!message) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: message,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        text: getMockReply(message),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  }, [input]);

  const sendSuggestion = useCallback((suggestion: string) => {
    send(suggestion);
  }, [send]);

  return { messages, input, setInput, send, sendSuggestion, isTyping, bottomRef };
}
