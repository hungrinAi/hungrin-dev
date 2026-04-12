import Promotion from '@/src/models/Promotion';

export const promotionRepository = {
  findByUser: (userId: string, filters: { status?: string; platform?: string } = {}) => {
    const query: Record<string, string> = { userId };
    if (filters.status)   query.status   = filters.status;
    if (filters.platform) query.platform = filters.platform;
    return Promotion.find(query).sort({ createdAt: -1 });
  },

  countActive: (userId: string) =>
    Promotion.countDocuments({ userId, status: 'active' }),

  create: (data: {
    userId: string;
    restaurantId?: string;
    name: string;
    offer: string;
    details?: string;
    target?: string;
    platform?: string;
    expectedResult?: string;
    startDate?: string;
    endDate?: string;
  }) => Promotion.create({ ...data, status: 'draft' }),

  updateStatus: (promotionId: string, status: string) =>
    Promotion.findByIdAndUpdate(promotionId, { status }, { new: true }),
};
