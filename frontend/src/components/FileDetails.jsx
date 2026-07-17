function FileDetails({ file, onClose }) {
  if (!file) return null;

  function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;

    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  function formatDate(date) {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="w-80 bg-white shadow-xl rounded-xl p-6 ml-6">
      <h2 className="text-2xl font-bold mb-6">📄 File Details</h2>

      <div className="space-y-4">
        <div>
          <p className="text-zinc-500">Name</p>
          <p className="font-medium">{file.name}</p>
        </div>

        <div>
          <p className="text-zinc-500">Extension</p>
          <p>{file.extension}</p>
        </div>

        <div>
          <p className="text-zinc-500">Size</p>
          <p>{formatSize(file.size)}</p>
        </div>

        <div>
          <p className="text-zinc-500">Created</p>
          <p>{formatDate(file.createdAt)}</p>
        </div>

        <div>
          <p className="text-zinc-500">Modified</p>
          <p>{formatDate(file.modifiedAt)}</p>
        </div>

        <div>
          <p className="text-zinc-500">Path</p>

          <p className="break-all text-sm">{file.path}</p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
      >
        Close
      </button>
    </div>
  );
}

export default FileDetails;
