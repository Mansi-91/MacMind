import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import FileFilters from "../components/FileFilters";
import FileDetails from "../components/FileDetails";
import api from "../services/api";
import {
  FolderOpen,
  Search,
  FileText,
} from "lucide-react";

function Files() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    try {
      const res = await api.get("/files");
      setFiles(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function applyFilters(filters) {
    try {
      if (Object.keys(filters).length === 0) {
        loadFiles();
        return;
      }

      const params = new URLSearchParams();

      if (filters.extension)
        params.append("extension", filters.extension);

      if (filters.minSize)
        params.append("minSize", filters.minSize);

      if (filters.maxSize)
        params.append("maxSize", filters.maxSize);

      const res = await api.get(
        `/files/filter?${params.toString()}`
      );

      setFiles(res.data);
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex bg-zinc-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* Hero */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl mb-8">

          <div className="flex items-center gap-4">

            <FolderOpen size={42} />

            <div>

              <h1 className="text-4xl font-bold">
                File Explorer
              </h1>

              <p className="text-indigo-100 mt-2">
                Browse, search and filter indexed files.
              </p>

            </div>

          </div>

        </div>

        {/* Filters */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

          <div className="flex items-center gap-3 mb-4">

            <Search className="text-indigo-600" />

            <h2 className="text-xl font-semibold">
              Advanced Filters
            </h2>

          </div>

          <FileFilters onFilter={applyFilters} />

        </div>

        {/* Content */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Table */}

          <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">

            <div className="flex justify-between items-center px-6 py-4 border-b">

              <h2 className="text-xl font-bold flex items-center gap-2">

                <FileText className="text-indigo-600" />

                Indexed Files

              </h2>

              <span className="text-sm text-zinc-500">

                {files.length} files

              </span>

            </div>

            <table className="w-full">

              <thead className="bg-zinc-100">

                <tr>

                  <th className="text-left p-4">
                    Name
                  </th>

                  <th className="text-left p-4">
                    Type
                  </th>

                  <th className="text-left p-4">
                    Size
                  </th>

                </tr>

              </thead>

              <tbody>

                {files.length > 0 ? (

                  files.map((file) => (

                    <tr
                      key={file.path}
                      onClick={() => setSelectedFile(file)}
                      className={`border-b cursor-pointer hover:bg-indigo-50 transition ${
                        selectedFile?.path === file.path
                          ? "bg-indigo-100"
                          : ""
                      }`}
                    >

                      <td className="p-4 font-medium">
                        {file.name}
                      </td>

                      <td className="p-4">
                        {file.extension}
                      </td>

                      <td className="p-4">
                        {(file.size / 1024).toFixed(2)} KB
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="3"
                      className="text-center py-10 text-zinc-500"
                    >

                      📂 No matching files found.

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* Details */}

          <div>

            <FileDetails
              file={selectedFile}
              onClose={() => setSelectedFile(null)}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Files;