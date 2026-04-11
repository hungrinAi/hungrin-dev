import { useState, useRef, useCallback, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

const AI_RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['promo', 'promotion', 'offer', 'discount'],
    reply: "Great idea! Based on your sales data, a **Buy 1 Get 1 Free** on Chicken Burgers this Tuesday could lift orders by ~15%. Want me to draft it?",
  },
  {
    keywords: ['customer', 'customers', 'base', 'loyal'],
    reply: "You have **127 repeat customers** this month — 23% up from last month. Your top segment is 25-34 year-olds ordering on Friday evenings.",
  },
  {
    keywords: ['revenue', 'sales', 'money', 'earn'],
    reply: "Your weekly revenue is **£1,250** and trending +22%. Your best day is Saturday. Promoting a weekend special could push it past £1,500.",
  },
  {
    keywords: ['post', 'social', 'instagram', 'facebook'],
    reply: 'Here\'s a draft: "🍔 Friday Night Special — order our Burger Bundle & get a FREE side! Available tonight only. Order now on Deliveroo. #FridayFeast"',
  },
  {
    keywords: ['weather', 'rain', 'sunny', 'cold'],
    reply: "Weather is giving you a **+15% order boost** right now. Cold snaps historically increase comfort food orders by 20%. Consider pushing a soup or hot drinks bundle.",
  },
  {
    keywords: ['help', 'what', 'can you', 'show me'],
    reply: "I can help you: **suggest promos**, **analyse your sales**, **create social posts**, **find your best customers**, or **predict busy periods**. What would you like?",
  },
];

const DEFAULT_REPLY =
  "Analysing your restaurant data… I'd suggest running a targeted promo this weekend based on your current order trends. Want more detail?";

function getMockReply(input: string): string {
  const lower = input.toLowerCase();
  const match = AI_RESPONSES.find(({ keywords }) =>
    keywords.some((k) => lower.includes(k))
  );
  return match?.reply ?? DEFAULT_REPLY;
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
