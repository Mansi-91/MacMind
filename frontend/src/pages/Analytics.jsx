import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import LargestFiles from "../components/LargestFiles";
import RecentFiles from "../components/RecentFiles";
import { PieChart as PieIcon, BarChart3 } from "lucide-react";

const COLORS = [
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#10B981",
  "#06B6D4",
  "#EF4444",
  "#84CC16",
];

function Analytics() {
  const [fileTypes, setFileTypes] = useState([]);
  const [storageData, setStorageData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const fileResponse = await api.get("/dashboard/file-types");
        const storageResponse = await api.get("/dashboard/storage");

        setFileTypes(fileResponse.data);
        setStorageData(storageResponse.data);
      } catch (err) {
        console.log("Analytics Error:", err);
      }
    };

    fetchAnalytics();
  }, []);

  // ---------- Top 8 Pie Data ----------

  const topFileTypes = [...fileTypes]
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const othersCount = fileTypes
    .slice(8)
    .reduce((sum, item) => sum + item.count, 0);

  if (othersCount > 0) {
    topFileTypes.push({
      extension: "Others",
      count: othersCount,
    });
  }

  // ---------- Top 10 Storage ----------

  const topStorage = [...storageData]
    .sort((a, b) => b.storage - a.storage)
    .slice(0, 10);

  const topStorageFormatted = topStorage.map((item) => ({
    ...item,
    storage: Number((item.storage / (1024 * 1024)).toFixed(2)),
  }));

  return (
    <div className="flex bg-zinc-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 max-w-7xl mx-auto p-8">
        {/* Hero */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl mb-8">
          <h1 className="text-4xl font-bold">File System Analytics</h1>

          <p className="text-indigo-100 mt-2">
            Interactive analytics dashboard for indexed files and storage usage.
          </p>
        </div>

        {/* Charts */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie */}

          <div className="bg-white rounded-3xl border border-zinc-200 shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <PieIcon className="text-indigo-600" />

              <h2 className="text-xl font-bold">Top File Types</h2>
            </div>

            <ResponsiveContainer width="100%" height={360}>
              <PieChart>
                <Pie
                  data={topFileTypes}
                  dataKey="count"
                  nameKey="extension"
                  outerRadius={120}
                  innerRadius={60}
                  paddingAngle={3}
                >
                  {topFileTypes.map((item, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />

                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Storage */}

          <div className="bg-white rounded-3xl border border-zinc-200 shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-indigo-600" />

              <h2 className="text-xl font-bold">Top Storage Consumers</h2>
            </div>

            <ResponsiveContainer width="100%" height={360}>
              <BarChart
                data={topStorageFormatted}
                layout="vertical"
                margin={{ left: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis type="number" tickFormatter={(value) => `${value} MB`} />

                <YAxis type="category" dataKey="extension" width={80} />

                <Tooltip formatter={(value) => [`${value} MB`, "Storage"]} />

                <Bar dataKey="storage" fill="#6366F1" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tables */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <LargestFiles />

          <RecentFiles />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
