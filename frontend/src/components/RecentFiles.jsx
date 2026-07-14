import { useEffect, useState } from "react";
import api from "../services/api";

function RecentFiles() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function loadFiles() {
      try {
        const res = await api.get("/dashboard/recent-files");

        setFiles(res.data);
      } catch (error) {
        console.log("Recent Files Error:", error);
      }
    }

    loadFiles();
  }, []);

  function formatDate(date) {
    if (!date) return "Unknown";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow
        p-6
        mt-8
        "
    >
      <h2
        className="
            text-xl
            font-semibold
            mb-5
            "
      >
        Recently Modified Files
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th
              className="
                        text-left
                        p-3
                        "
            >
              Name
            </th>

            <th
              className="
                        text-left
                        p-3
                        "
            >
              Type
            </th>

            <th
              className="
                        text-left
                        p-3
                        "
            >
              Modified
            </th>
          </tr>
        </thead>

        <tbody>
          {files.length > 0 ? (
            files.map((file) => (
              <tr key={file.path} className="border-b hover:bg-zinc-100">
                <td className="p-3">{file.name}</td>

                <td className="p-3">{file.extension}</td>

                <td className="p-3">{formatDate(file.modifiedAt)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="
                        text-center
                        p-5
                        text-zinc-500
                        "
              >
                No recent files found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentFiles;
