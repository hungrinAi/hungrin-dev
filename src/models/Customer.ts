import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  userId: mongoose.Types.ObjectId;
  restaurantId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  platform: string;
  totalOrders: number;
  totalSpend: number;
  status: string;
  lastOrderDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    platform: {
      type: String,
      enum: ['Uber Eats', 'Deliveroo', 'Just Eat'],
      default: 'Uber Eats',
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    totalSpend: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['new', 'regular', 'vip'],
      default: 'new',
    },
    lastOrderDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Customer ||
  mongoose.model<ICustomer>('Customer', CustomerSchema);