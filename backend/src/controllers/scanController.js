const scanner = require("../services/scanner");
const db = require("../database/db");

exports.scanFolder = async (req, res) => {
  const folderPath = req.query.path;

  if (!folderPath) {
    return res.status(400).json({
      message: "Folder path required",
    });
  }

  try {
    // Scan folder
    const files = scanner.scanDirectory(folderPath);

    // Prevent duplicate entries
    const insert = db.prepare(`
    INSERT OR IGNORE INTO files
    (
        name,
        path,
        extension,
        size,
        createdAt,
        modifiedAt
    )
    VALUES (?,?,?,?,?,?)
`);

    let count = 0;

    // SQLite Transaction (much faster)
    const insertMany = db.transaction((files) => {
      for (const file of files) {
        const result = insert.run(
          file.name,
          file.path,
          file.extension,
          file.size,
          file.createdAt,
          file.modifiedAt,
        );

        if (result.changes > 0) {
          count++;
        }
      }
    });

    insertMany(files);

    res.json({
      message: "Scan completed successfully",
      filesScanned: files.length,
      filesAdded: count,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Scanning failed",
      error: error.message,
    });
  }
};
