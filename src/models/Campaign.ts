import mongoose, { Schema, Document } from 'mongoose';

export interface ICampaign extends Document {
  userId: mongoose.Types.ObjectId;
  restaurantId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  platform: string;
  status: string;
  reach: number;
  clicks: number;
  conversions: number;
  budget: number;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema: Schema = new Schema(
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
    description: {
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
      enum: ['active', 'paused', 'draft'],
      default: 'draft',
    },
    reach: {
      type: Number,
      default: 0,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    conversions: {
      type: Number,
      default: 0,
    },
    budget: {
      type: Number,
      default: 0,
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

export default mongoose.models.Campaign ||
  mongoose.model<ICampaign>('Campaign', CampaignSchema);