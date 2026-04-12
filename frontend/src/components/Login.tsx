import React, { useState, useRef } from "react";

export default function Login() {
  const [step, setStep] = useState<1 | 2>(1);
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
    console.log("Verifying OTP:", finalOtp, "for", email);
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
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2 text-gray-800">
            <span className="text-3xl">🌱</span> Mitti Scan
          </h1>
          <p className="text-gray-500 text-sm">Welcome back! Log in to your farm dashboard.</p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-5 animate-fadeIn">
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
              className="w-full bg-[#27b755] hover:bg-[#1f9645] text-white font-semibold py-3 rounded-xl transition-colors shadow-sm"
            >
              Send Login OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-5 animate-fadeIn">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Enter the 4-digit code sent to your email
              </label>
              <div className="flex justify-center gap-3 mb-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
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
                Change Email
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-xl transition-colors shadow-sm"
            >
              Verify & Login
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#27b755] font-semibold hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}