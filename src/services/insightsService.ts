import { orderRepository } from '@/src/repositories/orderRepository';
import { customerRepository } from '@/src/repositories/customerRepository';

const PLATFORMS = ['Uber Eats', 'Deliveroo', 'Just Eat'];
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const insightsService = {
  async getInsights(userId: string) {
    const orders = await orderRepository.findByUser(userId);

    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const totalOrders  = orders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Platform breakdown
    const platformStats = PLATFORMS.map(platform => {
      const p = orders.filter(o => o.platform === platform);
      const revenue = p.reduce((sum, o) => sum + o.totalAmount, 0);
      return {
        platform,
        orders: p.length,
        revenue,
        share: totalRevenue > 0 ? ((revenue / totalRevenue) * 100).toFixed(1) : '0',
      };
    });

    // Weekly revenue trend (last 8 weeks)
    const weeklyTrend = Array.from({ length: 8 }, (_, i) => {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7 * (7 - i));
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const w = orders.filter(o => {
        const d = new Date(o.createdAt);
        return d >= weekStart && d < weekEnd;
      });

      return { week: `W${i + 1}`, revenue: w.reduce((sum, o) => sum + o.totalAmount, 0), orders: w.length };
    });

    // Peak day analysis
    const dayStats = DAY_LABELS.map((day, index) => {
      const d = orders.filter(o => new Date(o.createdAt).getDay() === index);
      return { day, orders: d.length, revenue: d.reduce((sum, o) => sum + o.totalAmount, 0) };
    });
    const peakDay = dayStats.reduce((max, d) => (d.orders > max.orders ? d : max), dayStats[0]);

    // Customer metrics
    const totalCustomers  = await customerRepository.countByUser(userId);
    const repeatCustomers = await customerRepository.countRepeat(userId);
    const repeatRate = totalCustomers > 0 ? ((repeatCustomers / totalCustomers) * 100).toFixed(1) : '0';

    return {
      stats: { totalRevenue, totalOrders, avgOrderValue: avgOrderValue.toFixed(2), totalCustomers, repeatRate, peakDay: peakDay.day },
      platformStats,
      weeklyTrend,
      dayStats,
    };
  },
};
