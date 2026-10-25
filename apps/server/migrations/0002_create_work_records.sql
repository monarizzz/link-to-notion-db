-- Migration number: 0002 	 2026-10-25T07:44:09.552Z

CREATE TABLE work_records (
  id TEXT PRIMARY KEY,
  title TEXT,
  started_at INTEGER NOT NULL,
  ended_at INTEGER NOT NULL CHECK (ended_at > started_at),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX work_records_started_at ON work_records (started_at);

CREATE TABLE work_record_labels (
  work_record_id TEXT NOT NULL REFERENCES work_records (id) ON DELETE CASCADE,
  label_id TEXT NOT NULL REFERENCES labels (id) ON DELETE CASCADE,
  PRIMARY KEY (work_record_id, label_id)
);
