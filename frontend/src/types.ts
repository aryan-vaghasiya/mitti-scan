export interface NutrientData {
  N: number;
  P: number;
  K: number;
  pH: number;
  crop: string;
  farmSize?: number;
  detected?: boolean;
}

export interface Suggestion {
  name: string;
  estimated_bags: string;
  estimated_cost: string;
}

export interface RecommendationResult {
  input: NutrientData;
  analysis: { nutrient: string; status: string; deficiency: string }[];
  recommendations: {
    nutrient: string;
    suggestions: Suggestion[];
  }[];
}

export interface ScanHistoryItem {
  _id: string;
  createdAt: string;
  cropType: string;
  landSize: { value: number; unit: string };
  extractedData: { N: number; P: number; K: number; pH: number };
  analysis: { nutrient: string; status: string; deficiencyPercentage: number }[];
  recommendations: { productName: string; estimatedBags: number; estimatedCost: number }[];
}