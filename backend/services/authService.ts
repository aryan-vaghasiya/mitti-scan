import { OtpVerification } from "../models/OtpVerification.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import sendMail from "../mailer/sendMail.js";
import jwt from "jsonwebtoken";

export const sendSignupOtp = async (name: string, email: string) => {
  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  await OtpVerification.deleteMany({ email });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  const otpEntry = await OtpVerification.create({
    email,
    otpHash,
    purpose: "signup",
    expiresAt,
  });

  if (!otpEntry) {
    throw new Error("Error generating signup OTP, Please try again");
  }

  try {
    await sendMail({
      to: email,
      subject: "Signup Verification - Mitti Scan",
      template: "signup-otp.hbs",
      replacements: { name, otp }
    })
  }
  catch (err) {
    console.error("Error sending signup OTP email: ", err);
    throw new Error("Error sending signup OTP email, Please try again");
  }
}

export const verifySignupOtp = async (otp: string, email: string, name: string) => {
  if (!otp || !email) {
    throw new Error("OTP and email are required");
  }

  const otpRecord = await OtpVerification.findOne({ email, purpose: "signup", expiresAt: { $gt: new Date() } });
  if (!otpRecord) {
    throw new Error("OTP expired, Please request a new one");
  }

  const isValid = await bcrypt.compare(otp, otpRecord.otpHash);
  if (!isValid) {
    throw new Error("Invalid OTP");
  }

  const newUser = await User.create({
    name,
    email: otpRecord.email,
    isVerified: true
  });

  if (!newUser) {
    throw new Error("Error creating user account, Please try again");
  }

  await OtpVerification.deleteMany({ email });

  const token = jwt.sign(
    {
      id: newUser._id.toString(),
      email: newUser.email,
      role: "user"
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    role: "user",
    user: newUser
  }
}

export const sendLoginOtp = async (email: string) => {
  if (!email) {
    throw new Error("Email is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  await OtpVerification.deleteMany({ email });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  const otpEntry = await OtpVerification.create({
    email,
    otpHash,
    purpose: "login",
    expiresAt
  });
  if (!otpEntry) {
    throw new Error("Error generating login OTP, Please try again");
  }

  try {
    await sendMail({
      to: email,
      subject: "Login Verification - Mitti Scan",
      template: "signup-otp.hbs",
      replacements: { name: user.name, otp }
    })
  }
  catch (err) {
    console.error("Error sending OTP email: ", err);
    throw new Error("Error sending OTP email, Please try again");
  }
}

export const verifyLoginOtp = async (email: string, otp: string) => {
  const otpDoc = await OtpVerification.findOne({
    email,
    purpose: "login"
  });

  if (!otpDoc) {
    throw new Error("OTP Expired, Please request for a new OTP");
  }
  const valid = await bcrypt.compare(otp, otpDoc.otpHash);
  if (!valid) {
    throw new Error("Invalid OTP");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const token = jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: "user"
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  await OtpVerification.deleteMany({ email });

  return {
    token,
    role: "user",
    user
  };
}
