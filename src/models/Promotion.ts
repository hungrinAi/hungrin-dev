import mongoose, { Schema, Document } from 'mongoose';

export interface IPromotion extends Document {
  userId: mongoose.Types.ObjectId;
  restaurantId: mongoose.Types.ObjectId;
  name: string;
  offer: string;
  details: string;
  target: string;
  platform: string;
  status: string;
  expectedResult: string;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PromotionSchema: Schema = new Schema(
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
    offer: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '',
    },
    platform: {
      type: String,
      enum: ['Uber Eats', 'Deliveroo', 'Just Eat', 'All'],
      default: 'All',
    },
    status: {
      type: String,
      enum: ['active', 'paused', 'draft', 'expired'],
      default: 'draft',
    },
    expectedResult: {
      type: String,
      default: '',
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Promotion ||
  mongoose.model<IPromotion>('Promotion', PromotionSchema);