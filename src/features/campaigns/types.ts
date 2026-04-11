export interface Campaign {
  id: string;
  name: string;
  emoji: string;
  meta: string;
  status: 'Active' | 'Paused' | 'Ended';
  orders: number;
  revenue: string;
  startDate: string;
  endDate: string;
}
