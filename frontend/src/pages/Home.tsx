import { Link } from "react-router-dom";

export default function Home() {
  // These are dummy data, we can show global scan (irrespective of user) from the DB and also the Stats are hard coded for now...
  const mockHistory = [
    { id: "1", date: "Oct 24, 2025", crop: "Wheat", status: "Low Nitrogen", action: "Buy Urea" },
    { id: "2", date: "Sep 12, 2025", crop: "Rice", status: "Optimal", action: "None Needed" },
    { id: "3", date: "Jun 05, 2025", crop: "Cotton", status: "Acidic pH", action: "Add Lime" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Turn Your Soil Health Card<br/>Into A Shopping List.
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Instantly digitize your NPK values and get clear, actionable fertilizer recommendations tailored exactly to your crop and farm size.
          </p>
          <Link 
            to="/scan" 
            className="inline-flex items-center justify-center gap-2 bg-[#27b755] hover:bg-[#1f9645] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Scan New Card
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-xl">📄</div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Scans</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-xl">⚠️</div>
            <div>
              <p className="text-sm font-medium text-gray-500">Issues Found</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl">🌿</div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Farm Health</p>
              <p className="text-2xl font-bold text-gray-900">78%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
            <h3 className="text-lg font-bold text-gray-800">Recent Scans</h3>
            <Link to="/history" className="text-sm font-medium text-[#27b755] hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Crop</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{item.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.crop}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Optimal' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}