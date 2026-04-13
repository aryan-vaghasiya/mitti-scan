import mongoose from "mongoose";
import { Schema } from "mongoose";

const scanSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cropType: { type: String, required: true },
  landSize: { 
    value: { type: Number, required: true },
    unit: { type: String, enum: ['acres', 'hectares'], required: true }
  },
  
  extractedData: {
    N: { type: Number, required: true },
    P: { type: Number, required: true },
    K: { type: Number, required: true },
    pH: { type: Number, required: true }
  },
  
  analysis: [{
    nutrient: { type: String },
    status: { type: String },
    deficiencyPercentage: { type: Number } 
  }],

  recommendations: [{
    productName: { type: String },
    estimatedBags: { type: Number },
    estimatedCost: { type: Number }
  }],

  cardImageUrl: { type: String } 

}, { timestamps: true });

scanSchema.index({ userId: 1, createdAt: -1 });

export const Scan = mongoose.model("Scan", scanSchema);