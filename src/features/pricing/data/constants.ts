import type { PricingPlan, FeatureRow } from '../types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: '19',
    desc: 'Ideal for new small businesses',
    features: [
      'Manage customer data and orders',
      'Basic AI insights',
      'Limited campaigns',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    price: '49',
    desc: 'Perfect for growing businesses ready to expand',
    features: [
      'All Starter features plus:',
      'Advanced AI insights',
      'Targeted campaigns',
      'Priority support',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Pro',
    price: '99',
    desc: 'Best for established businesses with high demands',
    features: [
      'All Growth features',
      'Custom AI solutions',
      'Exclusive promotions',
    ],
    cta: 'Get Started',
    popular: false,
  },
];

export const FEATURE_ROWS: FeatureRow[] = [
  { label: 'Manage Customer data and orders', starter: true, growth: true, pro: true },
  { label: 'AI Insights', starter: 'Basic', growth: 'Advanced', pro: true },
  { label: 'Campaigns', starter: 'Limited', growth: 'Targeted', pro: true },
  { label: 'Online Review Management', starter: false, growth: true, pro: true },
  { label: 'Priority Support', starter: false, growth: true, pro: true },
  { label: 'Delivery Optimisation', starter: false, growth: false, pro: true },
];

export const AI_REPLIES: Record<string, string> = {
  starter:
    'The **Starter plan** at £19/month is great for new restaurants just getting started. You get customer data management, basic AI insights, and email support. Perfect if you\'re testing Hungrin before committing to a bigger plan.',
  growth:
    'The **Growth plan** at £49/month is our most popular choice. You get advanced AI insights, targeted campaigns, and priority support — everything a growing restaurant needs to scale. Most customers see ROI within the first month.',
  pro:
    'The **Pro plan** at £99/month is for established restaurants with high order volumes. You get custom AI solutions, exclusive promotions, and everything in Growth — ideal if you\'re running multiple locations.',
  compare:
    'Comparing plans: **Starter** is best for testing, **Growth** for scaling, and **Pro** for high-volume operations. The main upgrades are AI depth and campaign targeting. My recommendation is the Growth plan for most restaurants.',
  cheap:
    'Looking for the best value? The **Starter plan** at £19/month has no frills but covers the basics. If you need more power, Growth at £49 pays for itself with just a few extra orders per month.',
  recommend:
    'Based on typical restaurant profiles, I\'d recommend the **Growth plan**. It balances price and features — advanced AI, targeted campaigns, and priority support all in one. You can always upgrade to Pro later.',
};

export function getAiReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('starter')) return AI_REPLIES.starter;
  if (lower.includes('growth')) return AI_REPLIES.growth;
  if (lower.includes('pro')) return AI_REPLIES.pro;
  if (lower.includes('compare') || lower.includes('difference')) return AI_REPLIES.compare;
  if (lower.includes('cheap') || lower.includes('affordable') || lower.includes('budget'))
    return AI_REPLIES.cheap;
  return AI_REPLIES.recommend;
}
