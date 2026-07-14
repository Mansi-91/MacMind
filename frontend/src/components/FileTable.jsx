function FileTable({ files }) {
  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden mt-4">
      <table className="w-full text-left">
        <thead className="bg-zinc-800">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Extension</th>
            <th className="p-4">Size</th>
          </tr>
        </thead>

        <tbody>
          {files.map((file) => (
            <tr
              key={file.id}
              className="border-t border-zinc-800 hover:bg-zinc-800 transition"
            >
              <td className="p-4">{file.name}</td>
              <td className="p-4">{file.extension}</td>
              <td className="p-4">{file.size} bytes</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileTable;