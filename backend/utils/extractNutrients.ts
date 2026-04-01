interface NutrientData {
    N: number | null;
    P: number | null;
    K: number | null;
    pH: number | null;
    detected: boolean;
}

const extract = (match: RegExpMatchArray | null): number | null => (match ? parseFloat(match[1] as string) : null);

function extractNutrients(text: string): NutrientData {

  const cleanText = text
  .replace(/\n/g, " ")
  .replace(/\s+/g, " ")
  .trim();

  const nitrogen =
    cleanText.match(/Nitrogen\s*\(N\)[^0-9]*([\d.]+)/i) ||
    cleanText.match(/\bN\b[^0-9]*([\d.]+)/i);

  const phosphorus =
    cleanText.match(/Phosphorus\s*\(P\)[^0-9]*([\d.]+)/i) ||
    cleanText.match(/\bP\b[^0-9]*([\d.]+)/i);

  const potassium =
    cleanText.match(/Potassium\s*\(K\)[^0-9]*([\d.]+)/i) ||
    cleanText.match(/\bK\b[^0-9]*([\d.]+)/i);

  const ph = cleanText.match(/\bpH\b[^0-9]*([\d.]+)/i);

  const result = {
    N: extract(nitrogen),
    P: extract(phosphorus),
    K: extract(potassium),
    pH: extract(ph),
  };

  return {
    ...result,
    detected: !!(result.N || result.P || result.K || result.pH)
  }
}

// function extractNutrients(text: string): NutrientData {
//     const N = text.match(/(Nitrogen.*?(\d+))|(N[\s:]+(\d+))/i);
//     const P = text.match(/(Phosphorus.*?(\d+))|(P[\s:]+(\d+))/i);
//     const K = text.match(/(Potassium.*?(\d+))|(K[\s:]+(\d+))/i);
//     const pH = text.match(/pH[:\s]*([0-9]+\.?[0-9]*)/i);

//     return {
//         N: N ? Number(N[2] || N[4]) : null,
//         P: P ? Number(P[2] || P[4]) : null,
//         K: K ? Number(K[2] || K[4]) : null,
//         pH: pH ? Number(pH[2]) : null,
//         detected: !!(N || P || K || pH)
//     };
// }

// const data = extractNutrients(`Select
// Major Languages
// Language
// English
// O All Dialects
// Unit
// Hectares (1 Ha=1.000 Hectares)
// Print
// 1
// of 1
// P
// 1
// Lime / Gypsum
// Find | Next
// General Recommendations
// Soil Test Results
// District Agriculture Office, WEST GODAVARI, ANDHRA PRADESH
// Department of Agriculture, Cooperation & Farmers Welfare
// Ministry of Agriculture and Farmers Welfare
// Government of India
// State Department of Agriculture(A.P.)
// SOR HEALTH
// CARD
// Soil Type: Black soil
// Sr.No. Parameter
// Test
// Unit
// Rating
// Normal Level
// Value
// 1
// pH
// 6.39
// Acidic
// 7. Neutral
// Soil Health Card
// 2
// EC
// 0.37 dS/m
// Normal
// 3
// Organic Carbon (OC)
// 0.40%
// Low
// 0-2 dS/m
// 0.51-0.75%
// Soil Health Card Number - AP/2017-18/35499766/2
// 4
// Available Nitrogen (N)
// 305.00 kg/ha
// Medium
// 280-560
// kg/ha
// Validity From: To:
// Farmer's Details
// Farmer Name
// Jupalli aachutharamarao
// 5 Available Phosphorus (P)
// 36.00 kg/ha
// High
// 11-26kg/ha
// Father's Husband Venkatrao
// 6 Available Potassium (K)
// 69.00 kg/ha
// Low
// 120-280kg/ha
// Name
// 7
// Available Sulphur (S)
// 36.00 ppm
// Sufficient
// 10 ppm
// Address
// XXXXX
// 8
// Available Zinc (Zn)
// 6.20 ppm
// Sufficient
// >0.6 ppm
// Mobile No.
// 9766-XXXX-XX
// 9
// Available Boron (B)
// 2.21 ppm
// Sufficient
// >0.5 ppm
// Gender
// XXXXX
// 10 Available Iron (Fe)
// 37.40 ppm
// Sufficient
// >4.5 ppm
// Category
// XXXXX
// 11 Available Manganese
// (Mn)
// 20.10 ppm
// Sufficient
// >2.0 ppm
// Date of Sample Collection
// Soil Sample Details
// 02-05-2017
// 12 Available Copper (Cu)
// 5.90 ppm
// Sufficient
// >0.2 ppm
// Survey No., Khasra No./ Dag 90/5,-
// No.
// Farm Size
// 1.19 Acre Irrigated(Canal)
// n.`)
// console.log(data);
export {extractNutrients}