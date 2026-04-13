import { Scan } from "../models/Scan.js";
import { recommendations } from "../services/getRecommendations.js";

const getRecommendations = async (req: Request, res: Response) => {
  try {
    const { nitrogen: N, phosphorus: P, potassium: K, ph: pH, crop } = req.query;
    const size = req.query.size ? parseFloat(req.query?.size as string) : undefined;

    if (!N || !P || !K || !pH || !crop) {
      res.status(400).json({ error: "Missing query parameters" });
      return;
    }

    const recomm = recommendations(N, P, K, pH, crop, size);

    if (req.user?.id) {
      const scanEntry = await Scan.create({
        userId: req.user.id,
        cropType: crop,
        landSize: {
          value: size || 1,
          unit: "hectares"
        },
        extractedData: {
          N: Number(N),
          P: Number(P),
          K: Number(K),
          pH: Number(pH)
        },

        analysis: recomm.analysis.map((item: any) => {
          const numericDeficiency = item.deficiency ? parseInt(item.deficiency.replace('%', ''), 10) : 0;

          return {
            nutrient: item.nutrient,
            status: item.status,
            deficiencyPercentage: numericDeficiency
          };
        }),

        recommendations: recomm.recommendations.flatMap((rec: any) =>
          rec.suggestions.map((suggestion: any) => ({
            productName: suggestion.name,
            estimatedBags: suggestion.estimated_bags,
            estimatedCost: suggestion.estimated_cost
          }))
        )
      });
    }

    res.json({ recommendations: recomm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
}

export { getRecommendations }