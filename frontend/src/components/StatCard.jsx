import { ArrowUpRight } from "lucide-react";

function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-indigo-500",
  subtitle = "",
}) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>

          <h2 className="text-3xl font-bold mt-2 text-gray-800">{value}</h2>

          {subtitle && <p className="text-sm text-gray-400 mt-2">{subtitle}</p>}
        </div>

        <div
          className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg`}
        >
          <Icon size={28} />
        </div>
      </div>

      <div className="flex items-center mt-6 text-green-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
        <ArrowUpRight size={18} className="mr-1" />
        Active
      </div>
    </div>
  );
}

export default StatCard;
