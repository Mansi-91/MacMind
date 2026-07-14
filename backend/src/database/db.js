const Database = require("better-sqlite3");

const db = new Database("macmind.db");

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

module.exports = db;