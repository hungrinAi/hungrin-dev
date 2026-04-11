import type { BillingHistoryRow, SubscriptionExtra } from '../types';

export const BILLING_HISTORY: BillingHistoryRow[] = [
  { date: 'April 20, 2025', description: 'Growth Plan', status: 'Paid', amount: '£49' },
  { date: 'March 20, 2025', description: 'Growth Plan', status: 'Paid', amount: '£49' },
  { date: 'February 20, 2025', description: 'Growth Plan', status: 'Paid', amount: '£49' },
  { date: 'January 20, 2025', description: 'Growth Plan', status: 'Paid', amount: '£49' },
];

export const PLAN_FEATURES = [
  'Connect unlimited delivery platforms',
  'Run unlimited promotions',
  'Real-time sales insights',
  'Targeted campaigns',
  'Priority support',
];

export const SUBSCRIPTION_EXTRAS: SubscriptionExtra[] = [
  { label: 'SMS Marketing', desc: 'Send promos to your customers via SMS', price: '£5/mo' },
  { label: 'Customer Loyalty', desc: 'Reward customers with loyalty programs', price: '£5/mo' },
];

export const BILLING_PAGES_TOTAL = 4;
