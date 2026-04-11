import { MessageCircle, Mail, BookOpen } from 'lucide-react';
import type { FaqEntry, SupportChannel } from '../types';

export const FAQS: FaqEntry[] = [
  {
    q: 'How do I connect my delivery platform?',
    a: 'Go to Onboarding → Platforms and click the platform you want to connect. Hungrin reads only your order history — it never modifies your account.',
  },
  {
    q: 'How does the AI generate promotions?',
    a: 'Hungrin analyses your order history, cuisine type, location, and local weather data to suggest promotions that are most likely to drive orders at low-traffic times.',
  },
  {
    q: 'Can I edit or reject an AI-generated promotion?',
    a: 'Yes. Every AI promotion is shown to you before it goes live. You can edit the offer, change the discount, or reject it entirely from the AI Promos page.',
  },
  {
    q: 'How do I upgrade or change my plan?',
    a: 'Head to Billing from your account menu. You can upgrade, downgrade, or cancel at any time — changes take effect at the start of your next billing cycle.',
  },
  {
    q: 'Is my restaurant data safe?',
    a: 'Yes. Hungrin connects to delivery platforms with read-only access. Your credentials are encrypted at rest and in transit. We never share your data with third parties.',
  },
  {
    q: 'What delivery platforms does Hungrin support?',
    a: 'Currently Uber Eats, Deliveroo, and Just Eat. More platforms are coming soon — reach out to support to request one.',
  },
];

export const CHANNELS: SupportChannel[] = [
  {
    id: 'chat',
    icon: MessageCircle,
    title: 'Live Chat',
    desc: 'Chat with our team in real time.',
    action: 'Start Chat',
    badge: 'Fastest',
    badgeColor: 'bg-g-pale text-g-dark',
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email Support',
    desc: 'We respond within 24 hours.',
    action: 'Send Email',
    badge: null,
    badgeColor: '',
  },
  {
    id: 'docs',
    icon: BookOpen,
    title: 'Help Docs',
    desc: 'Guides, walkthroughs and video tutorials.',
    action: 'Browse Docs',
    badge: null,
    badgeColor: '',
  },
];

export const AGENT_REPLIES = [
  "Hi! I'm Lucy from the Hungrin support team. How can I help you today?",
  "Thanks for reaching out! Let me look into that for you — one moment.",
  'Great question! That\'s something I can definitely help you with.',
  "I've escalated this to our technical team and you'll hear back within the hour.",
];

export const INITIAL_CHAT_MESSAGE = {
  id: '1',
  role: 'agent' as const,
  text: "Hi! I'm Lucy from the Hungrin support team. How can I help you today?",
};
