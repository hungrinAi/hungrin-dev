export interface OnboardingStep {
  id: number;
  label: string;
}

export interface LeftSlide {
  robot: string;
  badge: string;
  title: string;
  subtitle: string;
  tip: { label: string; text: string };
}

export interface RestaurantType {
  label: string;
  emoji: string;
}

export interface PlatformItem {
  id: string;
  name: string;
  desc: string;
  bg: string;
  text: string;
  emoji?: string;
  logo?: string;
}

export interface OnboardingForm {
  restaurantName: string;
  cityPostcode: string;
  restaurantType: string;
  avgOrdersPerDay: string;
  platforms: string[];
}