import { ShieldCheck } from "lucide-react";

function HealthScore({ stats }) {
  let score = 100;

  if (stats.totalFiles > 1000) score -= 10;

  if (stats.totalStorage > 1024 * 1024 * 1024)
    score -= 10;

  if (stats.pdfCount > 500)
    score -= 5;

  if (score < 0) score = 0;

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center gap-3">
        <ShieldCheck size={30} />
        <div>
          <h2 className="text-xl font-bold">MacMind Health</h2>
          <p className="text-indigo-100">
            Overall Storage Quality
          </p>
        </div>
      </div>

      <div className="mt-6 text-5xl font-bold">
        {score}
        <span className="text-2xl">/100</span>
      </div>

      <div className="mt-4">
        <div className="w-full bg-white/20 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default HealthScore;