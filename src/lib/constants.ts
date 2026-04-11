// ─── Routes ──────────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
  PROMOTIONS: '/promotions',
  ORDERS: '/orders',
  CUSTOMERS: '/customers',
  CAMPAIGNS: '/campaigns',
  INSIGHTS: '/insights',
  PRICING: '/pricing',
  DEMO: '/demo',
} as const;

// ─── Delivery Platforms ──────────────────────────────────────────────────────
export const DELIVERY_PLATFORMS = [
  { id: 'ubereats', label: 'Uber Eats', emoji: '🛵' },
  { id: 'doordash', label: 'DoorDash', emoji: '🦘' },
  { id: 'menulog', label: 'Menulog', emoji: '🍽️' },
] as const;

export type PlatformId = (typeof DELIVERY_PLATFORMS)[number]['id'];

// ─── Cuisine Types ────────────────────────────────────────────────────────────
export const CUISINE_TYPES = [
  { id: 'burger', label: 'Burger', emoji: '🍔' },
  { id: 'pizza', label: 'Pizza', emoji: '🍕' },
  { id: 'indian', label: 'Indian', emoji: '🍛' },
  { id: 'chinese', label: 'Chinese', emoji: '🥡' },
  { id: 'italian', label: 'Italian', emoji: '🍝' },
  { id: 'thai', label: 'Thai', emoji: '🍜' },
  { id: 'turkish', label: 'Turkish', emoji: '🥙' },
  { id: 'sushi', label: 'Sushi', emoji: '🍱' },
  { id: 'mexican', label: 'Mexican', emoji: '🌮' },
  { id: 'mediterranean', label: 'Mediterranean', emoji: '🫒' },
  { id: 'kebab', label: 'Kebab', emoji: '🍢' },
  { id: 'vegan', label: 'Vegan', emoji: '🥗' },
  { id: 'caribbean', label: 'Caribbean', emoji: '🍗' },
  { id: 'korean', label: 'Korean', emoji: '🍖' },
  { id: 'fastfood', label: 'Fast Food', emoji: '🍟' },
  { id: 'chicken', label: 'Chicken', emoji: '🐔' },
] as const;

export type CuisineId = (typeof CUISINE_TYPES)[number]['id'];

// ─── Onboarding ───────────────────────────────────────────────────────────────
export const ONBOARDING_STEPS = [
  { id: 1, label: 'Restaurant Info' },
  { id: 2, label: 'Your Platforms' },
  { id: 3, label: 'Your First Promo' },
  { id: 4, label: 'All Set!' },
] as const;

// ─── Storage Keys ─────────────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  LOGGED_IN: 'hungrinLoggedIn',
  USER_PROFILE: 'hungrinUserProfile',
} as const;

// ─── App Meta ─────────────────────────────────────────────────────────────────
export const APP_NAME = 'Hungrin';
export const APP_TAGLINE = 'AI-Powered Restaurant Growth';
