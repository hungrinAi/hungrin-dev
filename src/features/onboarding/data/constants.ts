import type { OnboardingStep, LeftSlide, RestaurantType, PlatformItem } from '../types';

export const STEPS: OnboardingStep[] = [
  { id: 1, label: 'Restaurant' },
  { id: 2, label: 'Platforms' },
  { id: 3, label: 'AI Promos' },
  { id: 4, label: "You're Live!" },
];

export const LEFT_SLIDES: LeftSlide[] = [
  {
    robot: '/images/robot-thumbsup.jpeg',
    badge: 'AI-Powered Growth',
    title: 'Grow Your Restaurant Orders Automatically',
    subtitle:
      'Hungrin uses AI to boost your sales, create promotions and bring you more customers — all from one simple dashboard.',
    tip: {
      label: 'Result',
      text: 'Restaurants using Hungrin see an average 3× more promo conversions within the first month.',
    },
  },
  {
    robot: '/images/robot-thinking.jpeg',
    badge: 'Smart Analysis',
    title: "AI That Learns Your Restaurant's Patterns",
    subtitle:
      'Connect your Uber Eats, Deliveroo or Just Eat data and watch Hungrin analyse your peak hours, slow days, and best-selling items.',
    tip: {
      label: 'Did you know',
      text: 'Hungrin identifies your top 3 revenue opportunities within 24 hours of connecting your data.',
    },
  },
  {
    robot: '/images/robot-happy.jpeg',
    badge: 'Promo Automation',
    title: 'Ready-to-Launch Promotions in Seconds',
    subtitle:
      'No marketing experience needed. Hungrin generates promotions tailored to your cuisine, location, and customer behaviour — ready to copy straight into your platform.',
    tip: {
      label: 'AI Insight',
      text: 'Rainy days see 38% fewer orders. Hungrin auto-suggests a deal before the weather hits.',
    },
  },
  {
    robot: '/images/robot-burger.jpeg',
    badge: 'Real Results',
    title: 'Join 500+ Restaurants Already Growing',
    subtitle:
      'From burger joints to Indian restaurants, Hungrin works across every cuisine type and every major delivery platform in the UK.',
    tip: {
      label: 'Community',
      text: 'Over 500 restaurants trust Hungrin to run their promotions and grow their customer base.',
    },
  },
];

export const RESTAURANT_TYPES: RestaurantType[] = [
  { label: 'Burger', emoji: '🍔' },
  { label: 'Pizza', emoji: '🍕' },
  { label: 'Indian', emoji: '🍛' },
  { label: 'Chinese', emoji: '🥡' },
  { label: 'Italian', emoji: '🍝' },
  { label: 'Thai', emoji: '🍜' },
  { label: 'Turkish', emoji: '🥙' },
  { label: 'Sushi', emoji: '🍱' },
  { label: 'Mexican', emoji: '🌮' },
  { label: 'Mediterranean', emoji: '🫒' },
  { label: 'Kebab', emoji: '🍢' },
  { label: 'Vegan', emoji: '🥗' },
  { label: 'Caribbean', emoji: '🍗' },
  { label: 'Korean', emoji: '🍖' },
  { label: 'Fast Food', emoji: '🍟' },
  { label: 'Chicken', emoji: '🐔' },
];

export const AVG_ORDERS = ['0 – 25', '25 – 50', '50 – 100', '100+'];

export const PLATFORMS: PlatformItem[] = [
  {
    id: 'uber',
    name: 'Uber Eats',
    desc: 'Connect to sync your Uber Eats order history',
    bg: 'bg-black',
    text: 'text-white',
    logo: '/logos/uber-eats.svg',
  },
  {
    id: 'deliveroo',
    name: 'Deliveroo',
    desc: 'Connect to sync your Deliveroo order history',
    bg: 'bg-[#00CCBC]',
    text: 'text-white',
    logo: '/logos/deliveroo.svg',
  },
  {
    id: 'justeat',
    name: 'Just Eat',
    desc: 'Connect to sync your Just Eat order history',
    bg: 'bg-[#FF8000]',
    text: 'text-white',
    logo: '/logos/just-eat.svg',
  },
];

export const STEP4_FEATURES = [
  { icon: '🤖', text: 'AI is monitoring your promotions in real-time' },
  { icon: '📊', text: 'Sales insights will appear in your dashboard' },
  { icon: '🎯', text: 'Promotions update automatically based on trends' },
  { icon: '📱', text: "You'll receive alerts when promos go live" },
];

export const STEP4_STATS = [
  { label: 'Setup', val: '✓ Done' },
  { label: 'AI Status', val: '🟢 Live' },
  { label: 'Promos', val: '🎯 Ready' },
];

export const STEP3_STATS = [
  { label: 'Avg uplift', val: '+18%' },
  { label: 'Conversion rate', val: '45%' },
  { label: 'Restaurants using', val: '500+' },
];