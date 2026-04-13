import { promotionRepository } from '@/src/repositories/promotionRepository';

export const promotionService = {
  async getPromotions(userId: string, filters: { status?: string; platform?: string } = {}) {
    const promotions = await promotionRepository.findByUser(userId, filters);

    const summary = {
      totalPromotions:  promotions.length,
      activePromotions: promotions.filter(p => p.status === 'active').length,
      draftPromotions:  promotions.filter(p => p.status === 'draft').length,
    };

    return { promotions, summary };
  },

  createPromotion: (data: Parameters<typeof promotionRepository.create>[0]) =>
    promotionRepository.create(data),

  async updateStatus(promotionId: string, status: string) {
    const promotion = await promotionRepository.updateStatus(promotionId, status);
    if (!promotion) throw new Error('NOT_FOUND');
    return promotion;
  },
};
