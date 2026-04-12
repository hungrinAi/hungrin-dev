import User from '@/src/models/User';

export const userRepository = {
  findByEmail: (email: string) =>
    User.findOne({ email }),

  findById: (id: string) =>
    User.findById(id),

  create: (data: { name: string; email: string; password: string; restaurantName: string }) =>
    User.create(data),
};
