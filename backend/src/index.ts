import express, { type Application, type Request, type Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import { getRecommendations } from '../controllers/recommendationController.js';
import { ocrController } from '../controllers/ocrController.js';

const app: Application = express();
app.use(cors());
const port = process.env.PORT || 3000;

const upload = multer({
  storage: multer.memoryStorage(),
});



app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Mitti Scan Server!');
});

app.post("/ocr", upload.single("image"), ocrController)

app.get("/recommendations", getRecommendations);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});