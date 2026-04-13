import { orderRepository } from '@/src/repositories/orderRepository';
import { customerRepository } from '@/src/repositories/customerRepository';
import { promotionRepository } from '@/src/repositories/promotionRepository';

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

export const dashboardService = {
  async getStats(userId: string) {
    const orders = await orderRepository.findByUser(userId);

    const totalRevenue   = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const totalOrders    = orders.length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const pendingOrders   = orders.filter(o => o.status === 'pending').length;

    const todayStart     = startOfDay(new Date());
    const todayOrders    = orders.filter(o => new Date(o.createdAt) >= todayStart);
    const todayRevenue   = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    const weekStart      = daysAgo(7);
    const weeklyOrders   = orders.filter(o => new Date(o.createdAt) >= weekStart);
    const weeklyRevenue  = weeklyOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    const totalCustomers  = await customerRepository.countByUser(userId);
    const activePromotions = await promotionRepository.countActive(userId);

    const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyData = DAY_LABELS.map((day, i) => {
      const dayStart = daysAgo(6 - i);
      const dayEnd   = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const dayOrders = orders.filter(o => {
        const d = new Date(o.createdAt);
        return d >= dayStart && d < dayEnd;
      });

      return {
        day,
        orders:  dayOrders.length,
        revenue: dayOrders.reduce((sum, o) => sum + o.totalAmount, 0),
      };
    });

    return {
      stats: {
        totalRevenue, totalOrders, completedOrders, pendingOrders,
        todayRevenue, todayOrders: todayOrders.length,
        weeklyRevenue, weeklyOrders: weeklyOrders.length,
        totalCustomers, activePromotions,
      },
      weeklyData,
      recentOrders: orders.slice(0, 5),
    };
  },
};
