const fs = require("fs");
const path = require("path");

function scanDirectory(directory) {
  let files = [];

  let items = [];

  // Read directory safely
  try {
    items = fs.readdirSync(directory);
  } catch (err) {
    console.log(`Skipping folder: ${directory}`);
    return files;
  }

  for (const item of items) {
    const fullPath = path.join(directory, item);

    let stats;

    // Read file stats safely
    try {
      stats = fs.statSync(fullPath);
    } catch (err) {
      console.log(`Skipping file: ${fullPath}`);
      continue;
    }

    // Ignore hidden system folders/files (optional)
    if (item.startsWith(".")) {
      continue;
    }

    if (stats.isDirectory()) {
      files = files.concat(scanDirectory(fullPath));
    } else {
      files.push({
        name: item,
        path: fullPath,
        extension: path.extname(item),
        size: stats.size,
        createdAt: stats.birthtime.toISOString(),
        modifiedAt: stats.mtime.toISOString(),
      });
    }
  }

  return files;
}

module.exports = {
  scanDirectory,
};
