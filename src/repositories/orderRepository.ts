import Order from '@/src/models/Order';

export const orderRepository = {
  findByUser: (userId: string, filters: { status?: string; platform?: string } = {}) => {
    const query: Record<string, string> = { userId };
    if (filters.status)   query.status   = filters.status;
    if (filters.platform) query.platform = filters.platform;
    return Order.find(query).sort({ createdAt: -1 });
  },

  create: (data: {
    userId: string;
    restaurantId?: string;
    platform: string;
    orderNumber: string;
    items: unknown[];
    totalAmount: number;
    status?: string;
  }) => Order.create({ ...data, status: data.status ?? 'pending' }),
};
