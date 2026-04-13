import Campaign from '@/src/models/Campaign';

export const campaignRepository = {
  findByUser: (userId: string, status?: string) => {
    const query: Record<string, string> = { userId };
    if (status) query.status = status;
    return Campaign.find(query).sort({ createdAt: -1 });
  },

  create: (data: {
    userId: string;
    restaurantId?: string;
    name: string;
    description?: string;
    platform?: string;
    budget?: number;
    startDate?: string;
    endDate?: string;
  }) => Campaign.create({ ...data, status: 'draft' }),

  updateStatus: (campaignId: string, status: string) =>
    Campaign.findByIdAndUpdate(campaignId, { status }, { new: true }),
};
