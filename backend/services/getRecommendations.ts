import { buildRecommendation } from "../utils/recommendations.js";

function recommendations(N: number, P: number, K: number, pH: number, crop: string) {

    let analysis = [];
    let recommendations = [];

    const cropStandards:object = {
        rice: { N: 150, P: 50, K: 120 },
        wheat: { N: 120, P: 40, K: 100 },
        cotton: { N: 100, P: 50, K: 50 },
        maize: { N: 140, P: 60, K: 40 }
    };

    const ideal = cropStandards[crop] || cropStandards["wheat"];

    function getDeficiency(actual: number, ideal: number) {
        if (actual >= ideal) return 0;
        return Math.round(((ideal - actual) / ideal) * 100);
    }

    let nDef = getDeficiency(N, ideal.N);
    analysis.push({
        nutrient: "Nitrogen",
        status: N < ideal.N ? "Low" : "Normal",
        deficiency: nDef + "%"
    });
    if (N === null) {
        analysis.push({
            nutrient: "Nitrogen",
            status: "Not Detected"
        });
    } else if (N < ideal.N) {
        recommendations.push(
            buildRecommendation("Nitrogen", nDef, [
                { name: "Neem Coated Urea", type: "chemical", price_per_bag: 300 },
                { name: "Ammonium Sulphate", type: "chemical", price_per_bag: 350 },
                { name: "Compost", type: "organic", price_per_bag: 200 }
            ])
        );
    }

    let pDef = getDeficiency(P, ideal.P);
    analysis.push({
        nutrient: "Phosphorus",
        status: P < ideal.P ? "Low" : "Normal",
        deficiency: pDef + "%"
    });
    if (P === null) {
        analysis.push({
            nutrient: "Phosphorus",
            status: "Not Detected"
        });
    } else
        if (P < ideal.P) {
            recommendations.push(
                buildRecommendation("Phosphorus", pDef, [
                    { name: "SSP", type: "chemical", price_per_bag: 400 },
                    { name: "DAP", type: "chemical", price_per_bag: 1200 },
                    { name: "Bone Meal", type: "organic", price_per_bag: 500 }
                ])
            );
        }

    let kDef = getDeficiency(K, ideal.K);
    analysis.push({
        nutrient: "Potassium",
        status: K < ideal.K ? "Low" : "Normal",
        deficiency: kDef + "%"
    });

    if (K === null) {
        analysis.push({
            nutrient: "Potassium",
            status: "Not Detected"
        });
    } else if (K < ideal.K) {
        recommendations.push(
            buildRecommendation("Potassium", kDef, [
                { name: "MOP", type: "chemical", price_per_bag: 350 },
                { name: "SOP", type: "chemical", price_per_bag: 500 },
                { name: "Wood Ash", type: "organic", price_per_bag: 150 }
            ])
        );
    }

    if (pH === null) {
        analysis.push({
            nutrient: "pH",
            status: "Not Detected"
        });
    } else
        if (pH < 6) {
            analysis.push({ nutrient: "pH", status: "Acidic" });
            recommendations.push({
                nutrient: "pH Correction",
                suggestions: [
                    { name: "Lime", type: "chemical", purpose: "Increase soil pH" },
                    { name: "Dolomite", type: "natural", purpose: "Neutralize acidity" }
                ]
            });
        } else if (pH > 7.5) {
            analysis.push({ nutrient: "pH", status: "Alkaline" });
            recommendations.push({
                nutrient: "pH Correction",
                suggestions: [
                    { name: "Gypsum", type: "chemical", purpose: "Reduce alkalinity" }
                ]
            });
        } else {
            analysis.push({ nutrient: "pH", status: "Normal" });
        }

    return {
        input: {
            N,
            P,
            K,
            pH,
            crop
        },
        analysis,
        recommendations,
        summary: "Soil deficiencies detected. Apply suitable fertilizers based on recommendations.",
        note: "Recommendations are indicative. Consult local agricultural expert before application."
    };
}

export { recommendations };