import { campaignRepository } from '@/src/repositories/campaignRepository';

export const campaignService = {
  async getCampaigns(userId: string, status?: string) {
    const campaigns = await campaignRepository.findByUser(userId, status);

    const summary = {
      totalCampaigns:  campaigns.length,
      activeCampaigns: campaigns.filter(c => c.status === 'active').length,
      totalReach:      campaigns.reduce((sum, c) => sum + c.reach,   0),
      totalClicks:     campaigns.reduce((sum, c) => sum + c.clicks,  0),
    };

    return { campaigns, summary };
  },

  createCampaign: (data: Parameters<typeof campaignRepository.create>[0]) =>
    campaignRepository.create(data),

  async updateStatus(campaignId: string, status: string) {
    const campaign = await campaignRepository.updateStatus(campaignId, status);
    if (!campaign) throw new Error('NOT_FOUND');
    return campaign;
  },
};
