export interface PromoCardData {
  title: string;
  price: string;
  originalPrice: string;
  emoji: string;
  image?: string;
  slots: number;
}

export interface PromoMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  type?: 'text' | 'promo-card';
  data?: PromoCardData;
}

export interface ChatSession {
  id: string;
  name: string;
  messages: PromoMessage[];
  preview: string;
}
