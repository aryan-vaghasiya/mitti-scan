import { type RecommendationResult } from "../types";
import { getBagsString } from "../utils/getBagsString";

interface AnalysisResultsProps {
  result: RecommendationResult;
}

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Input Values</h3>
        <p className="text-gray-600 font-medium">
          N: {result.input.N} | P: {result.input.P} | K: {result.input.K} | pH: {result.input.pH}
        </p>
      </div>

      <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">Analysis</h2>
        <div className="flex flex-col gap-2">
          {result.analysis?.map((item, i) => (
            <p key={i} className="text-gray-700">
              <span className="font-semibold">{item.nutrient}:</span> {item.status}{" "}
              {item.deficiency && <span className="text-red-500 text-sm">({item.deficiency})</span>}
            </p>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Recommendations</h2>
        <div className="flex flex-col gap-5">
          {result.recommendations?.map((rec, i) => (
            <div key={i} className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
              <h4 className="font-semibold text-emerald-800 mb-2">{rec.nutrient}</h4>
              <ul className="list-disc list-inside space-y-1">
                {rec.suggestions?.map((s, j) => (
                  <li key={j} className="text-gray-700 text-sm">
                    {/* <span className="font-medium">{s.name}</span> — {s.estimated_bags || "0"} bags — ₹{s.estimated_cost || "0"} */}
                    <span className="font-medium">{s.name}</span>: {getBagsString(s.estimated_bags) || "0"} - ₹{s.estimated_cost || "0"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}