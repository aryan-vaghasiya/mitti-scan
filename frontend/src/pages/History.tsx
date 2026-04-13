import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { type ScanHistoryItem } from "../types";

export default function History() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [scans, setScans] = useState<ScanHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:3000/scans/history", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Failed to fetch history");

        const data = await response.json();
        console.log("Fetched scan history:", data);
        setScans(data.scans);
      } catch (err) {
        console.error(err);
        setError("Could not load your scan history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchHistory();
    }
  }, [token]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Farm History</h1>
            <p className="text-gray-500 mt-1">Review your past soil health reports and recommendations.</p>
          </div>
          <Link
            to="/scan"
            className="hidden sm:inline-flex bg-[#27b755] hover:bg-[#1f9645] text-white px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-sm"
          >
            + Scan New Card
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-6">
            {error}
          </div>
        )}

        {loading && !error && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse flex flex-col gap-4">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-100 rounded w-full mt-2"></div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && scans.length === 0 && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
            <div className="text-6xl mb-6">🏜️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No scans found yet</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              It looks like you haven't digitized any soil health cards yet. Start tracking your soil health to get personalized fertilizer recommendations.
            </p>
            <Link
              to="/scan"
              className="inline-flex bg-[#27b755] hover:bg-[#1f9645] text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Scan Your First Card
            </Link>
          </div>
        )}

        {!loading && !error && scans.length > 0 && (
          <div className="space-y-5">
            {scans.map((scan) => {
              const isExpanded = expandedId === scan._id;
              const date = new Date(scan.createdAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric"
              });

              const hasDeficiencies = scan.analysis.some(a => a.status === "Low" || a.status === "Acidic" || a.status === "Alkaline");

              return (
                <div key={scan._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">

                  <div
                    onClick={() => toggleExpand(scan._id)}
                    className="p-5 sm:p-6 cursor-pointer hover:bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{date}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${hasDeficiencies ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                          }`}>
                          {hasDeficiencies ? "Action Required" : "Optimal Health"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 capitalize">
                        {scan.cropType} <span className="text-gray-400 font-normal text-base">— {scan.landSize.value} {scan.landSize.unit}</span>
                      </h3>
                    </div>

                    <button className="text-[#27b755] font-semibold text-sm flex items-center gap-1">
                      {isExpanded ? "Hide Details" : "View Report"}
                      <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="p-5 sm:p-6 border-t border-gray-100 bg-gray-50/50 animate-fadeIn">

                      <div className="mb-6">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Soil Analysis</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {scan.analysis.map((item, i) => (
                            <div key={i} className="bg-white p-3 rounded-xl border border-gray-100">
                              <p className="text-xs text-gray-500 font-medium mb-1">{item.nutrient}</p>
                              <p className={`font-bold ${item.status === "Low" || item.status === "Acidic" ? "text-red-500" : "text-emerald-600"}`}>
                                {item.status} {item.deficiencyPercentage > 0 && `(-${item.deficiencyPercentage}%)`}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {scan.recommendations.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Shopping List</h4>
                          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                            <table className="w-full text-left text-sm">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-3 font-semibold text-gray-600">Product</th>
                                  <th className="px-4 py-3 font-semibold text-gray-600 text-center">Quantity</th>
                                  <th className="px-4 py-3 font-semibold text-gray-600 text-right">Est. Cost</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {scan.recommendations.map((rec, i) => (
                                  <tr key={i}>
                                    <td className="px-4 py-3 font-medium text-gray-900">{rec.productName}</td>
                                    <td className="px-4 py-3 text-gray-600 text-center">{rec.estimatedBags} bags</td>
                                    <td className="px-4 py-3 text-gray-900 font-semibold text-right">₹{rec.estimatedCost}</td>
                                  </tr>
                                ))}
                                <tr className="bg-emerald-50/50">
                                  <td colSpan={2} className="px-4 py-3 font-bold text-emerald-800 text-right">Total Estimated Cost:</td>
                                  <td className="px-4 py-3 font-bold text-emerald-800 text-right">
                                    ₹{scan.recommendations.reduce((acc, curr) => acc + curr.estimatedCost, 0)}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}