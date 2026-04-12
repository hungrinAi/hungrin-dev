import mongoose, { Schema, Document } from 'mongoose';

export interface IRestaurant extends Document {
  userId: mongoose.Types.ObjectId;
  restaurantName: string;
  location: string;
  averageOrdersPerDay: number;
  restaurantType: string;
  platforms: {
    name: string;
    connected: boolean;
    accountId?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const RestaurantSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: '',
    },
    averageOrdersPerDay: {
      type: Number,
      default: 0,
    },
    restaurantType: {
      type: String,
      default: 'burger',
    },
    platforms: [
      {
        name: {
          type: String,
          enum: ['Uber Eats', 'Deliveroo', 'Just Eat'],
        },
        connected: {
          type: Boolean,
          default: false,
        },
        accountId: {
          type: String,
          default: '',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Restaurant ||
  mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);