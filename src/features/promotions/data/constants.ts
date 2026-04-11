import type { PromoMessage, ChatSession } from '../types';

export const INITIAL_MESSAGES: PromoMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Hi! I'm your AI Growth Assistant. I can help you create high-converting promotions for your restaurant. What would you like to promote today?",
    type: 'text',
  },
];

export const SEED_SESSIONS: ChatSession[] = [
  {
    id: 'session-1',
    name: 'Burger Bundle',
    preview: 'Burger Bundle deal for Tuesdays',
    messages: [
      { id: 's1-1', role: 'assistant', content: "Hi! I'm your AI Growth Assistant. What would you like to promote today?", type: 'text' },
      { id: 's1-2', role: 'user', content: 'Create a burger bundle for slow Tuesdays', type: 'text' },
      { id: 's1-3', role: 'assistant', content: "Great idea! Based on your sales data, a 'Burger Bundle' would perform exceptionally well on Tuesdays. Here's a draft:", type: 'promo-card', data: { title: 'Burger Bundle!', price: '£12.99', originalPrice: '£16.99', emoji: '🍔', image: '/images/food/burger.jpg', slots: 7 } },
    ],
  },
  {
    id: 'session-2',
    name: 'Weekend Specials',
    preview: 'Family feast promotion',
    messages: [
      { id: 's2-1', role: 'assistant', content: "Hi! I'm your AI Growth Assistant. What would you like to promote today?", type: 'text' },
      { id: 's2-2', role: 'user', content: 'I want a weekend family feast deal', type: 'text' },
      { id: 's2-3', role: 'assistant', content: "Perfect for weekends! Here's a family-friendly promo to boost Saturday orders:", type: 'promo-card', data: { title: 'Family Feast Deal', price: '£24.99', originalPrice: '£31.99', emoji: '🍕', image: '/images/food/pizza.jpg', slots: 5 } },
    ],
  },
  {
    id: 'session-3',
    name: 'Lunch Deals',
    preview: 'Lunchtime office crowd promo',
    messages: [
      { id: 's3-1', role: 'assistant', content: "Hi! I'm your AI Growth Assistant. What would you like to promote today?", type: 'text' },
      { id: 's3-2', role: 'user', content: 'Suggest a lunch deal for office workers nearby', type: 'text' },
      { id: 's3-3', role: 'assistant', content: "Great timing — your area has high office density at lunch. Here's a targeted deal:", type: 'promo-card', data: { title: 'Office Lunch Special', price: '£8.99', originalPrice: '£11.99', emoji: '🥗', image: '/images/food/salad.jpg', slots: 12 } },
    ],
  },
];

export const QUICK_ACTIONS = [
  'Suggest A Promo',
  'Current offers',
  'Get More Customers',
  'Create a Post',
];

export const AI_PROMO_RESPONSE = {
  content:
    "That sounds like a great idea! Based on your sales data, a 'Burger Bundle' would perform exceptionally well on Tuesdays. Here's a draft promotion I've created for you:",
  data: {
    title: 'Burger Bundle!',
    price: '£12.99',
    originalPrice: '£16.99',
    emoji: '🍔',
    image: '/images/food/burger.jpg',
    slots: 7,
  },
};
