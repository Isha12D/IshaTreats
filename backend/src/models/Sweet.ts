// sweet.ts
import mongoose, { Document, Schema } from "mongoose";

export enum SweetCategory {
  GENERAL = "general",
  PEDA = "peda",
  MILK_BASED = "milk_based",
  HALWA = "halwa",
  BENGALI = "bengali_sweets",
  CAKES = "oven_delights",
  FUSION = "fusion",
  BARFI = "barfi",
  LADDOO = "laddoo"
}

export interface ISweet extends Document {
  name: string;
  category: SweetCategory;
  price: number;
  quantity: number;
  image: string;
}

const sweetSchema = new Schema<ISweet>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: Object.values(SweetCategory), // 🔥 ENFORCED
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      // required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISweet>("Sweet", sweetSchema);
