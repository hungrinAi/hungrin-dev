export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: string;
  text: string;
}

export interface Product {
  name: string;
  category: string;
  sales: number;
  revenue: string;
  growth: string;
  trend: string;
  emoji: string;
}

export interface InsightsData {
  customerSegments: { name: string; value: number }[];
  salesTrend: { name: string; sales: number }[];
  recommendations: Recommendation[];
  topProducts: Product[];
}
