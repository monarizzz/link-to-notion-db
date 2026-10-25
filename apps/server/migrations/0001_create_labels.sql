-- Migration number: 0001 	 2026-10-25T07:22:04.663Z

CREATE TABLE labels (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
