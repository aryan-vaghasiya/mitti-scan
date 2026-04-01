import { recommendations } from "../services/getRecommendations.js";

const getRecommendations =(req: Request, res: Response) => {
  try {    
    const {nitrogen: N, phosphorus: P, potassium: K, ph: pH, crop} = req.query;  
    if (!N || !P || !K || !pH || !crop) {
      res.status(400).json({ error: "Missing query parameters" });
      return;
    }   
  
    const recomm = recommendations(N, P, K, pH, crop);
  
    res.json({ recommendations: recomm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
}

export { getRecommendations }