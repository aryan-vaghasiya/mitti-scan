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

export {extractNutrients}