import Customer from '@/src/models/Customer';

export const customerRepository = {
  findByUser: (userId: string) =>
    Customer.find({ userId }).sort({ createdAt: -1 }),

  countByUser: (userId: string) =>
    Customer.countDocuments({ userId }),

  countRepeat: (userId: string) =>
    Customer.countDocuments({ userId, totalOrders: { $gt: 1 } }),

  create: (data: {
    userId: string;
    restaurantId?: string;
    name: string;
    email: string;
    phone?: string;
    platform?: string;
  }) => Customer.create(data),
};
