import { useState } from "react";
import api from "../services/api";

function ScanPanel({ onScanComplete }) {
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function scanFolder() {
    if (!path.trim()) {
      setMessage("Please enter a folder path.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await api.get(`/scan?path=${encodeURIComponent(path)}`);

      setMessage("✅ Scan completed successfully!");

      if (onScanComplete) {
        onScanComplete();
      }
    } catch (err) {
      setMessage("❌ Failed to scan folder.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">
        📂 Scan Folder
      </h2>

      <input
        type="text"
        placeholder="/Users/mansikapse/Desktop"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4"
      />

      <button
        onClick={scanFolder}
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {loading ? "Scanning..." : "Scan Folder"}
      </button>

      {message && (
        <p className="mt-4 font-medium">
          {message}
        </p>
      )}
    </div>
  );
}

export default ScanPanel;