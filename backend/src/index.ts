import express, { type Application, type Request, type Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import { getRecommendations } from '../controllers/recommendationController.js';
import { ocrController } from '../controllers/ocrController.js';
import { loginOtp, signupOtp, verifyLogin, verifySignup } from '../controllers/authController.js';
import { connectDB } from '../config/db.js'
import sendMail from '../mailer/sendMail.js';
import { optionalAuth } from '../middlewares/optionalAuth.js';
import requiredAuth from '../middlewares/requiredAuth.js';
import { getMyScans } from '../controllers/scanController.js';

const app: Application = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

const upload = multer({
  storage: multer.memoryStorage(),
});


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Mitti Scan Server!');
});

app.post("/ocr", upload.single("image"), optionalAuth, ocrController)

app.get("/recommendations", optionalAuth, getRecommendations);

app.post(`/auth/signup-otp`, signupOtp);
app.post(`/auth/verify-signup-otp`, verifySignup);
app.post(`/auth/login-otp`, loginOtp);
app.post(`/auth/verify-login-otp`, verifyLogin)

app.get("/scans/history", requiredAuth, getMyScans)

connectDB()

// sendMail({
//   to: "example@mail.com",
//   subject: "Test Email from Mitti Scan",
//   template: "signup-otp.hbs",
//   replacements: { name: "John Doe", otp: "1233"}
// }).then(info => {
//   console.log("Test email sent successfully: ", info);
// }).catch(err => {
//   console.error("Error sending test email: ", err);
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});