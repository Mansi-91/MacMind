import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import FileFilters from "../components/FileFilters";
import api from "../services/api";

function Files() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    const res = await api.get("/files");

    setFiles(res.data);
  }

  async function applyFilters(filters) {
    if (Object.keys(filters).length === 0) {
      loadFiles();
      return;
    }

    const params = new URLSearchParams(filters);

    const res = await api.get(`/files/filter?${params}`);

    setFiles(res.data);
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-zinc-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Files</h1>

        <FileFilters onFilter={applyFilters} />

        <table className="w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Size</th>
            </tr>
          </thead>

          <tbody>
            {files.map((file) => (
              <tr key={file.path} className="border-b">
                <td className="p-3">{file.name}</td>

                <td className="p-3">{file.extension}</td>

                <td className="p-3">{file.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Files;
