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
