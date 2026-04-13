import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  targetNutrient: { type: String, enum: ['N', 'P', 'K', 'pH'], required: true },
  description: { type: String },
  bagWeightKg: { type: Number, required: true },
  pricePerBag: { type: Number, required: true },
  isOrganic: { type: Boolean, default: false }
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);