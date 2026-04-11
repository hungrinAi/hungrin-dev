export interface BillingHistoryRow {
  date: string;
  description: string;
  status: string;
  amount: string;
}

export interface SubscriptionExtra {
  label: string;
  desc: string;
  price: string;
}
