export interface NutrientData {
  N: number;
  P: number;
  K: number;
  pH: number;
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