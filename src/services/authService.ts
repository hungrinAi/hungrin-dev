import bcrypt from 'bcryptjs';
import { userRepository } from '@/src/repositories/userRepository';

export const authService = {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('INVALID_CREDENTIALS');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('INVALID_CREDENTIALS');

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      restaurantName: user.restaurantName,
      plan: user.plan,
    };
  },

  async register(data: { name: string; email: string; password: string; restaurantName: string }) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw new Error('EMAIL_TAKEN');

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await userRepository.create({ ...data, password: hashedPassword });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      restaurantName: user.restaurantName,
    };
  },
};
