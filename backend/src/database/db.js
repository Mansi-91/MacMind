const Database = require("better-sqlite3");

const db = new Database("macmind.db");

// Create table
db.exec(`
CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    path TEXT UNIQUE NOT NULL,
    extension TEXT,
    size INTEGER,
    createdAt TEXT,
    modifiedAt TEXT
);
`);

// Create indexes for faster searching/filtering
db.exec(`
CREATE INDEX IF NOT EXISTS idx_name
ON files(name);

CREATE INDEX IF NOT EXISTS idx_extension
ON files(extension);

CREATE INDEX IF NOT EXISTS idx_size
ON files(size);

CREATE INDEX IF NOT EXISTS idx_modifiedAt
ON files(modifiedAt);
`);

module.exports = db;