import type { ElementType } from 'react';

export interface FaqEntry {
  q: string;
  a: string;
}

export interface SupportChannel {
  id: string;
  icon: ElementType;
  title: string;
  desc: string;
  action: string;
  badge: string | null;
  badgeColor: string;
}

export interface ChatMessage {
  id: string;
  role: 'agent' | 'user';
  text: string;
}
