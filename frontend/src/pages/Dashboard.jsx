import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import SearchBar from "../components/SearchBar";
import FileTable from "../components/FileTable";

import ScanButton from "../components/ScanButton";

function Dashboard() {
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalStorage: 0,
    pdfCount: 0,
    imageCount: 0,
  });

  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch dashboard statistics
  const fetchStats = async () => {
    try {
      const res = await api.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // Fetch all files
  const fetchFiles = async () => {
    try {
      const res = await api.get("/files");
      setFiles(res.data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  // Search files
  const searchFiles = async (keyword) => {
    try {
      const res = await api.get(`/files/search?q=${keyword}`);
      setFiles(res.data);
    } catch (err) {
      console.error("Error searching files:", err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchStats();
    fetchFiles();
  }, []);

  // Search whenever input changes
  useEffect(() => {
    if (search.trim() === "") {
      fetchFiles();
    } else {
      searchFiles(search);
    }
  }, [search]);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-2">
          Dashboard
        </h1>
        <div className="mb-8">
            <ScanButton 
                onComplete={() => {
                    fetchStats();
                    fetchFiles();
                }}
            />
        </div>

        <p className="text-zinc-400 mb-8">
          Welcome to MacMind 🚀
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Total Files"
            value={stats.totalFiles}
          />

          <StatCard
            title="Storage Used"
            value={`${(stats.totalStorage / 1024).toFixed(2)} KB`}
          />

          <StatCard
            title="PDF Files"
            value={stats.pdfCount}
          />

          <StatCard
            title="Images"
            value={stats.imageCount}
          />
        </div>

        {/* Search */}
        <div className="mt-10">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* File Table */}
        <div className="mt-8">
          <FileTable files={files} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;