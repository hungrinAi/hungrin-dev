import { TrendingUp, CloudSun, Utensils, ShoppingBag } from 'lucide-react';
import type { ElementType } from 'react';
import type { DashboardStats } from '../types';

// ─── StatsGrid cards ─────────────────────────────────────────────────────────

export interface StatCard {
  icon: ElementType;
  label: string;
  key: keyof DashboardStats;
  prefix?: string;
  suffix?: string;
  change: string;
  positive: boolean;
  gradient: string;
  iconBg: string;
}

export const STATS_CARDS: StatCard[] = [
  {
    icon: ShoppingBag,
    label: 'New Orders Today',
    key: 'newOrdersToday',
    prefix: '',
    change: '+12%',
    positive: true,
    gradient: 'from-[#e8f8f0] to-[#d0eedd]',
    iconBg: 'bg-g-dark',
  },
  {
    icon: TrendingUp,
    label: 'Weekly Revenue',
    key: 'weeklyRevenue',
    prefix: '£',
    change: '+22%',
    positive: true,
    gradient: 'from-[#eef3ff] to-[#dde8ff]',
    iconBg: 'bg-[#4f6ef7]',
  },
  {
    icon: CloudSun,
    label: 'Weather Effect',
    key: 'weatherEffect',
    prefix: '+',
    suffix: '%',
    change: 'Impact ↑',
    positive: true,
    gradient: 'from-[#fff8e8] to-[#ffefc8]',
    iconBg: 'bg-[#e5a020]',
  },
  {
    icon: Utensils,
    label: 'Total Orders',
    key: 'totalOrders',
    prefix: '',
    change: '→ 34%',
    positive: false,
    gradient: 'from-[#fdf0f8] to-[#f7ddf0]',
    iconBg: 'bg-[#c050a0]',
  },
];

// ─── AI chat responses ────────────────────────────────────────────────────────

export interface AiResponse {
  keywords: string[];
  reply: string;
}

export const AI_RESPONSES: AiResponse[] = [
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

export const DEFAULT_AI_REPLY =
  "Analysing your restaurant data… I'd suggest running a targeted promo this weekend based on your current order trends. Want more detail?";

// ─── Boost promo ──────────────────────────────────────────────────────────────

export type Platform = 'Google' | 'Uber Eats' | 'Just Eat' | 'Deliveroo';
export type BoostDuration = 'Day' | 'Week' | 'Month';

export const ALL_PLATFORMS: Platform[] = ['Google', 'Uber Eats', 'Just Eat', 'Deliveroo'];
export const DURATIONS: BoostDuration[] = ['Day', 'Week', 'Month'];

// ─── Dashboard view helpers ───────────────────────────────────────────────────

export function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export interface QuickLink {
  href: string;
  emoji: string;
  label: string;
  sub: string;
  gradient: string;
  hoverRing: string;
}

export const QUICK_LINKS: QuickLink[] = [
  { href: '/promotions', emoji: '🎯', label: 'AI Promos',  sub: 'Create smart promotions', gradient: 'from-[#e8f8f0] to-[#d0eedd]', hoverRing: 'hover:ring-g-dark/30'       },
  { href: '/orders',     emoji: '📂', label: 'CSV Upload', sub: 'Upload sales data',        gradient: 'from-[#eef3ff] to-[#dde8ff]', hoverRing: 'hover:ring-[#4f6ef7]/30'   },
  { href: '/customers',  emoji: '👥', label: 'Customers',  sub: 'View your base',           gradient: 'from-[#fdf0f8] to-[#f7ddf0]', hoverRing: 'hover:ring-[#c050a0]/30'   },
  { href: '/insights',   emoji: '📊', label: 'Insights',   sub: 'Revenue & trends',         gradient: 'from-[#fff8e8] to-[#ffefc8]', hoverRing: 'hover:ring-[#e5a020]/30'   },
];
