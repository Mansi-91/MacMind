const fs = require("fs");
const path = require("path");

function scanDirectory(directory) {
    let files = [];

    const items = fs.readdirSync(directory);

    for (const item of items) {

        const fullPath = path.join(directory, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            files = files.concat(scanDirectory(fullPath));
        } else {
            files.push({
                name: item,
                path: fullPath,
                size: stats.size,
                extension: path.extname(item),
                createdAt: stats.birthtime,
                modifiedAt: stats.mtime
            });
        }
    }

    return files;
}

module.exports = scanDirectory;