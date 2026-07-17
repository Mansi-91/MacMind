const fs = require("fs");
const path = require("path");

// Folders to skip
const SKIP_FOLDERS = new Set([
    "node_modules",
    ".git",
    ".next",
    ".cache",
    ".Trash",
    "Library",
    "Applications",
    "System",
    "Volumes",
    ".DS_Store"
]);

function scanDirectory(directory) {
    let files = [];

    let items;

    try {
        items = fs.readdirSync(directory);
    } catch (err) {
        return files;
    }

    for (const item of items) {

        if (SKIP_FOLDERS.has(item)) {
            continue;
        }

        const fullPath = path.join(directory, item);

        let stats;

        try {
            stats = fs.statSync(fullPath);
        } catch {
            continue;
        }

        if (stats.isDirectory()) {
            files.push(...scanDirectory(fullPath));
        } else {

            files.push({
                name: item,
                path: fullPath,
                extension: path.extname(item) || "Unknown",
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