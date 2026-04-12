import type { BillingHistoryRow, SubscriptionExtra } from '../types';

export interface Plan {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  desc: string;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '£19',
    priceNum: 19,
    desc: 'Perfect for new restaurants',
    features: ['1 delivery platform', 'Basic insights', '5 promotions/mo'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '£49',
    priceNum: 49,
    desc: 'Most popular for growing restaurants',
    features: ['Unlimited platforms', 'AI insights', 'Unlimited promotions', 'Priority support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '£99',
    priceNum: 99,
    desc: 'For high-volume restaurants',
    features: ['Everything in Growth', 'Dedicated account manager', 'Custom integrations', 'API access'],
  },
];

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
