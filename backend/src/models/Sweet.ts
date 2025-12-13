import mongoose, { Document, Schema } from "mongoose";

export interface ISweet extends Document {
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string; // new field for image URL
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
      required: true,
      trim: true,
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
      required: true, // make false if you want optional
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISweet>("Sweet", sweetSchema);
