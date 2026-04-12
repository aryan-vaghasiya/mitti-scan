import React, { useState, useRef } from "react";

export default function Signup() {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    console.log("Creating account for:", name, email, "with OTP:", finalOtp);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all duration-300">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Create an Account</h1>
          <p className="text-gray-500 text-sm">Start digitizing your soil health cards today.</p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4 animate-fadeIn">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#27b755]/20 focus:border-[#27b755] outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#27b755]/20 focus:border-[#27b755] outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#27b755] hover:bg-[#1f9645] text-white font-semibold py-3 rounded-xl transition-colors shadow-sm mt-2"
            >
              Send Verification Code
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-5 animate-fadeIn">
            <div className="text-center mb-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#27b755]/10 text-[#27b755] mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Verify your email
              </label>
              <p className="text-xs text-gray-500">We sent a 4-digit code to your inbox.</p>
            </div>

            <div className="flex justify-center gap-3 mb-2 mt-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#27b755]/20 focus:border-[#27b755] outline-none transition-all"
                />
              ))}
            </div>
            
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm text-[#27b755] hover:text-[#1f9645] w-full text-center mt-2 font-medium transition-colors"
            >
              Edit Details
            </button>
            
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-xl transition-colors shadow-sm"
            >
              Create Account
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-[#27b755] font-semibold hover:underline">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}