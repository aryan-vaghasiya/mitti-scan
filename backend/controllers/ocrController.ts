import { ImageAnnotatorClient } from "@google-cloud/vision";
import { extractNutrients } from "../utils/extractNutrients.js";

const client = new ImageAnnotatorClient({
  keyFilename: `./vision-api.json`
});

const ocrController = async (req: Request, res: Response) => {
  try {
    const imageBuffer = req.file.buffer;

    const [result] = await client.documentTextDetection(imageBuffer);
    const fullTextAnnotation = result.fullTextAnnotation;

    if (!fullTextAnnotation?.text) {
      res.status(400).json({ error: "No text found" });
    }

    const extractedText = fullTextAnnotation?.text;
    const values = extractNutrients(extractedText || "");

    if(!values?.detected) {
      res.status(400).json({ error: "No nutrients detected" });
    }

    res.json({ nutrients: values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OCR failed" });
  }
}

export { ocrController }