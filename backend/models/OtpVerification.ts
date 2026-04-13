import mongoose from "mongoose";
import { Schema } from "mongoose";

const otpVerificationSchema = new Schema({
  email: { type: String, required: true },
  otpHash: { type: String, required: true },
  purpose: { type: String, enum: ['signup', 'login'], required: true },
  expiresAt: { type: Date, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

otpVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OtpVerification = mongoose.model("OtpVerification", otpVerificationSchema);