import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import {
  Copy,
  HardDrive,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

function Duplicates() {
  const [duplicates, setDuplicates] = useState([]);

  useEffect(() => {
    fetchDuplicates();
  }, []);

  async function fetchDuplicates() {
    try {
      const res = await api.get("/files/duplicates");
      setDuplicates(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const totalDuplicates = duplicates.reduce(
    (sum, file) => sum + (file.copies - 1),
    0
  );

  const storageSaved = duplicates.reduce(
    (sum, file) => sum + file.size * (file.copies - 1),
    0
  );

  return (
    <div className="flex bg-zinc-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">

        {/* Hero */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl mb-8">

          <h1 className="text-4xl font-bold">
            Duplicate File Analytics
          </h1>

          <p className="text-indigo-100 mt-2">
            Identify duplicate files and estimate recoverable storage.
          </p>

        </div>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-4">

              <Copy className="text-indigo-600" />

              <h2 className="font-semibold text-lg">
                Duplicate Files
              </h2>

            </div>

            <h3 className="text-4xl font-bold">
              {totalDuplicates}
            </h3>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-4">

              <HardDrive className="text-indigo-600" />

              <h2 className="font-semibold text-lg">
                Potential Storage Saved
              </h2>

            </div>

            <h3 className="text-3xl font-bold">
              {(storageSaved / (1024 * 1024)).toFixed(2)} MB
            </h3>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-4">

              {duplicates.length === 0 ? (
                <ShieldCheck className="text-green-600" />
              ) : (
                <AlertTriangle className="text-orange-500" />
              )}

              <h2 className="font-semibold text-lg">
                Status
              </h2>

            </div>

            <h3
              className={`text-2xl font-bold ${
                duplicates.length === 0
                  ? "text-green-600"
                  : "text-orange-500"
              }`}
            >
              {duplicates.length === 0
                ? "Healthy"
                : "Needs Cleanup"}
            </h3>

          </div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="px-6 py-5 border-b">

            <h2 className="text-xl font-bold">
              Duplicate Files
            </h2>

          </div>

          {duplicates.length === 0 ? (

            <div className="text-center py-20">

              <ShieldCheck
                size={70}
                className="mx-auto text-green-500 mb-4"
              />

              <h2 className="text-2xl font-bold">
                Great!
              </h2>

              <p className="text-zinc-500 mt-2">
                No duplicate files were detected.
              </p>

            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-zinc-100">

                <tr>

                  <th className="text-left p-4">
                    File Name
                  </th>

                  <th className="text-left p-4">
                    Size
                  </th>

                  <th className="text-left p-4">
                    Copies
                  </th>

                </tr>

              </thead>

              <tbody>

                {duplicates.map((file, index) => (

                  <tr
                    key={index}
                    className="border-b hover:bg-indigo-50 transition"
                  >

                    <td className="p-4 font-medium">
                      {file.name}
                    </td>

                    <td className="p-4">
                      {(file.size / 1024).toFixed(2)} KB
                    </td>

                    <td className="p-4">
                      {file.copies}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>
    </div>
  );
}

export default Duplicates;