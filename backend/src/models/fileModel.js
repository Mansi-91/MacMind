const db = require("../database/db");

// Insert scanned files into database
function insertMany(files) {
  const insert = db.prepare(`
        INSERT OR REPLACE INTO files
        (name, path, extension, size, createdAt, modifiedAt)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

  const transaction = db.transaction((files) => {
    for (const file of files) {
      insert.run(
        file.name,

        file.path,

        file.extension,

        file.size,

        file.createdAt.toISOString(),

        file.modifiedAt.toISOString(),
      );
    }
  });

  transaction(files);
}

// Get all files
function getAllFiles() {
  return db
    .prepare(
      `
        SELECT *
        FROM files
    `,
    )
    .all();
}

// Normal filename search
function searchFiles(keyword) {
  return db
    .prepare(
      `
        SELECT *
        FROM files
        WHERE name LIKE ?
    `,
    )
    .all(`%${keyword}%`);
}

// Advanced search with filters
function advancedSearch(filters) {
  let query = `

        SELECT *

        FROM files

        WHERE 1=1

    `;

  const params = [];

  // File type filter
  if (filters.extension) {
    query += `

            AND extension = ?

        `;

    params.push(filters.extension);
  }

  // Minimum size filter
  if (filters.minSize) {
    query += `

            AND size >= ?

        `;

    params.push(Number(filters.minSize));
  }

  // Maximum size filter
  if (filters.maxSize) {
    query += `

            AND size <= ?

        `;

    params.push(Number(filters.maxSize));
  }

  // Modified date filter
  if (filters.date) {
    query += `

            AND modifiedAt >= ?

        `;

    params.push(filters.date);
  }

  // Sorting
  query += `

        ORDER BY size DESC

    `;

  return db.prepare(query).all(...params);
}

function getDuplicateFiles() {
  return db
    .prepare(
      `
        SELECT
            name,
            size,
            COUNT(*) AS copies
        FROM files
        GROUP BY name, size
        HAVING COUNT(*) > 1
        ORDER BY copies DESC, size DESC
    `,
    )
    .all();
}

module.exports = {
  insertMany,

  getAllFiles,

  searchFiles,

  advancedSearch,

  getDuplicateFiles
};
