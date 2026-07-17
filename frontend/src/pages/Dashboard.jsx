import { useEffect, useState } from "react";

import api from "../services/api";

import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";
import ScanPanel from "../components/ScanPanel";
import SearchBar from "../components/SearchBar";
import StatCard from "../components/StatCard";
import FileTable from "../components/FileTable";
import InsightsCard from "../components/InsightsCard";
import HealthScore from "../components/HealthScore";
import { FolderOpen, HardDrive, FileText, Image } from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalStorage: 0,
    pdfCount: 0,
    imageCount: 0,
  });

  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDashboard();
    fetchFiles();
  }, []);

  async function fetchDashboard() {
    try {
      const res = await api.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Dashboard Error:", err);
    }
  }

  async function fetchFiles() {
    try {
      const res = await api.get("/files");
      setFiles(res.data);
    } catch (err) {
      console.error("Files Error:", err);
    }
  }

  async function searchFiles(keyword) {
    setSearch(keyword);

    try {
      if (keyword.trim() === "") {
        fetchFiles();
        return;
      }

      const res = await api.get(`/files/search?q=${keyword}`);

      setFiles(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 overflow-auto">
        {/* Hero Section */}

        <HeroSection stats={stats} />

        {/* Scan Panel */}

        <ScanPanel
          onScanComplete={() => {
            fetchDashboard();
            fetchFiles();
          }}
        />

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Files"
            value={stats.totalFiles}
            icon={FolderOpen}
            color="bg-indigo-500"
            subtitle="Indexed Files"
          />

          <StatCard
            title="Storage Used"
            value={`${(stats.totalStorage / (1024 * 1024 * 1024)).toFixed(
              2,
            )} GB`}
            icon={HardDrive}
            color="bg-emerald-500"
            subtitle="Disk Usage"
          />

          <StatCard
            title="PDF Files"
            value={stats.pdfCount}
            icon={FileText}
            color="bg-red-500"
            subtitle="Documents"
          />

          <StatCard
            title="Images"
            value={stats.imageCount}
            icon={Image}
            color="bg-pink-500"
            subtitle="Photos"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <HealthScore stats={stats} />

          <InsightsCard stats={stats} />
        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Search Files</h2>

          <SearchBar
            value={search}
            onChange={(e) => searchFiles(e.target.value)}
          />
        </div>

        {/* Files */}

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-5">Recent Indexed Files</h2>

          <FileTable files={files} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
