import { orderRepository } from '@/src/repositories/orderRepository';

export const orderService = {
  async getOrders(userId: string, filters: { status?: string; platform?: string } = {}) {
    const orders = await orderRepository.findByUser(userId, filters);

    const summary = {
      totalOrders:     orders.length,
      completedOrders: orders.filter(o => o.status === 'completed').length,
      pendingOrders:   orders.filter(o => o.status === 'pending').length,
      cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
      totalRevenue:    orders.reduce((sum, o) => sum + o.totalAmount, 0),
    };

    return { orders, summary };
  },

  createOrder: (data: Parameters<typeof orderRepository.create>[0]) =>
    orderRepository.create(data),
};
