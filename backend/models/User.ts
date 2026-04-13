import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  farmSize: { 
    value: { type: Number },
    unit: { type: String, enum: ['acres', 'hectares'] }
  },
  preferredLanguage: { type: String, default: 'en' },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);