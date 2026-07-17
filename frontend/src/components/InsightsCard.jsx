import { Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";

function InsightsCard({ stats }) {
  const insights = [];

  if (stats.pdfCount > 0)
    insights.push(`📄 ${stats.pdfCount} PDF files indexed.`);

  if (stats.imageCount > 0)
    insights.push(`🖼️ ${stats.imageCount} image files found.`);

  if (stats.totalFiles < 10)
    insights.push("💡 Scan a larger folder for richer analytics.");

  if (stats.totalStorage > 1024 * 1024 * 500)
    insights.push("⚠ Large storage usage detected.");

  if (stats.totalStorage < 1024 * 1024 * 100)
    insights.push("✅ Storage usage is currently low.");

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl border border-zinc-800 p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-5">
        <Lightbulb className="text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Storage Insights</h2>
      </div>

      <div className="space-y-3">
        {insights.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-zinc-300"
          >
            {item.includes("⚠") ? (
              <AlertTriangle className="text-orange-400" size={18} />
            ) : (
              <CheckCircle className="text-green-400" size={18} />
            )}

            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InsightsCard;