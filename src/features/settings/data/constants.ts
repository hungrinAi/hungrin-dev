import { User, CreditCard, Users, Bell } from 'lucide-react';
import type { ElementType } from 'react';

export interface SettingsNavItem {
  label: string;
  href: string;
  icon: ElementType;
}

export interface PlatformConfig {
  key: 'deliveroo' | 'uber' | 'justeat';
  name: string;
  color: string;
  letter: string;
}

export interface NotificationConfig {
  key: 'email' | 'promos' | 'reports';
  label: string;
  desc: string;
}

export const SETTINGS_NAV: SettingsNavItem[] = [
  { label: 'Account Profile', href: '/settings/account', icon: User },
  { label: 'Billing', href: '/billing', icon: CreditCard },
  { label: 'Team', href: '/settings/team', icon: Users },
  { label: 'Notifications', href: '/settings/notifications', icon: Bell },
];

export const PLATFORM_LIST: PlatformConfig[] = [
  { key: 'deliveroo', name: 'Deliveroo', color: 'bg-[#00CCBC]', letter: 'D' },
  { key: 'uber', name: 'Uber Eats', color: 'bg-black', letter: 'U' },
  { key: 'justeat', name: 'Just Eat', color: 'bg-[#FF8000]', letter: 'J' },
];

export const NOTIFICATION_LIST: NotificationConfig[] = [
  { key: 'email', label: 'Email Alerts', desc: 'Get notified about new orders and activity' },
  { key: 'promos', label: 'Promotion Suggestions', desc: 'AI-generated promo recommendations' },
  { key: 'reports', label: 'Weekly Performance Reports', desc: 'Summary of your weekly sales data' },
];

// ─── Shared form style tokens ─────────────────────────────────────────────────

export const inputCls = "w-full bg-g-faint border border-border-light rounded-xl px-4 py-2.5 text-sm outline-none focus:border-g-dark focus:ring-2 focus:ring-g-pale transition-all";
export const labelCls = "block text-xs font-bold text-text-dark mb-1.5";

// ─── Validation regexes ───────────────────────────────────────────────────────

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_RE = /^\+?[\d\s\-().]{7,}$/;

// ─── Account profile sub-navigation ──────────────────────────────────────────

export interface AccountNavItem {
  label: string;
  href: string;
  icon: ElementType;
}

export const ACCOUNT_SUB_NAV: AccountNavItem[] = [
  { label: 'Account', href: '/settings/account', icon: User },
  { label: 'Billing', href: '/billing', icon: CreditCard },
  { label: 'Team', href: '/settings/team', icon: Users },
  { label: 'Notifications', href: '/settings/notifications', icon: Bell },
];

// ─── Account connected platforms initial state ────────────────────────────────

export interface AccountPlatform {
  id: string;
  name: string;
  color: string;
  letter: string;
  connected: boolean;
}

export const ACCOUNT_PLATFORMS: AccountPlatform[] = [
  { id: 'deliveroo', name: 'Deliveroo', color: 'bg-[#00CCBC]', letter: 'D', connected: true },
  { id: 'uber', name: 'Uber Eats', color: 'bg-black', letter: 'U', connected: true },
  { id: 'justeat', name: 'Just Eat', color: 'bg-[#FF8000]', letter: 'J', connected: false },
];
