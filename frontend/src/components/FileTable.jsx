import {
  FileText,
  Image,
  FileCode,
  FileArchive,
  File,
} from "lucide-react";

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function getIcon(extension) {
  extension = extension?.toLowerCase();

  if (extension === ".pdf") return <FileText size={20} className="text-red-500" />;

  if ([".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(extension))
    return <Image size={20} className="text-pink-500" />;

  if (
    [".js", ".jsx", ".ts", ".tsx", ".java", ".cpp", ".c", ".py"].includes(
      extension
    )
  )
    return <FileCode size={20} className="text-blue-500" />;

  if ([".zip", ".rar", ".7z"].includes(extension))
    return <FileArchive size={20} className="text-yellow-500" />;

  return <File size={20} className="text-gray-500" />;
}

function FileTable({ files }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-5 py-4 text-left text-gray-700 font-semibold">
              File
            </th>

            <th className="px-5 py-4 text-left text-gray-700 font-semibold">
              Type
            </th>

            <th className="px-5 py-4 text-left text-gray-700 font-semibold">
              Size
            </th>
          </tr>
        </thead>

        <tbody>
          {files.length === 0 ? (
            <tr>
              <td
                colSpan="3"
                className="text-center py-8 text-gray-500"
              >
                No files found.
              </td>
            </tr>
          ) : (
            files.map((file) => (
              <tr
                key={file.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {getIcon(file.extension)}

                    <span className="font-medium text-gray-800">
                      {file.name}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {file.extension || "-"}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {formatSize(file.size)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FileTable;