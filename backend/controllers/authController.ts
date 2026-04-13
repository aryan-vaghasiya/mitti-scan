import { sendLoginOtp, sendSignupOtp, verifyLoginOtp, verifySignupOtp } from "../services/authService.js";

const signupOtp = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const sendOtp = await sendSignupOtp(name, email);
    res.status(200).json({ message: "Signup OTP sent successfully" });
  } catch (error) {
    console.error("Error sending signup OTP:", error);
    res.status(500).json({ error: "Failed to send Signup OTP" });
  }
};

const verifySignup = async (req: Request, res: Response) => {
  const { otp, email, name } = req.body;

  try {
    const verifyOtp = await verifySignupOtp(otp, email, name);
    res.status(200).json(verifyOtp);
  } catch (error) {
    console.error("Error verifying signup OTP:", error);
    res.status(500).json({ error: "Failed to verify Signup OTP" });
  }
};

const loginOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const otpSent = await sendLoginOtp(email);
    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending Login OTP: ", error);
    return res.status(500).json({ error: "Error sending Login OTP" });
  }
};

const verifyLogin = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    const verificationResult = await verifyLoginOtp(email, otp);
    return res.status(200).json(verificationResult);
  } catch (error) {
    console.error("Error verifying Login OTP: ", error.message);
    return res.status(500).json({ message: error.message || "Error verifying Login OTP" });
  }
}

export { signupOtp, verifySignup, loginOtp, verifyLogin };
