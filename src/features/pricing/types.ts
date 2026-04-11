export interface PricingPlan {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface FeatureRow {
  label: string;
  starter: boolean | string;
  growth: boolean | string;
  pro: boolean | string;
}

export interface AiMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
}
