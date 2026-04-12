import { customerRepository } from '@/src/repositories/customerRepository';

export const customerService = {
  async getCustomers(userId: string) {
    const customers = await customerRepository.findByUser(userId);

    const summary = {
      totalCustomers: customers.length,
      vipCustomers:   customers.filter(c => c.status === 'vip').length,
      newCustomers:   customers.filter(c => c.status === 'new').length,
      totalSpend:     customers.reduce((sum, c) => sum + c.totalSpend, 0),
    };

    return { customers, summary };
  },

  createCustomer: (data: Parameters<typeof customerRepository.create>[0]) =>
    customerRepository.create(data),
};
