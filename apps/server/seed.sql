-- 開発用の初期データ
-- ID を固定して INSERT OR IGNORE するため、再実行しても重複せず、既存データも消さない
-- 日時は日本時間で書き、-9 hours で UTC に直してからミリ秒の UNIX 時間にする

INSERT OR IGNORE INTO labels (id, name, color, created_at, updated_at) VALUES
  ('seed-label-programming', 'プログラミング',   '#8a6a2b', unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-label-job-hunting', 'インターン・就活', '#3d5a8a', unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-label-chores',      '雑務',             '#3f6b4f', unixepoch('now') * 1000, unixepoch('now') * 1000);

INSERT OR IGNORE INTO work_records (id, title, started_at, ended_at, created_at, updated_at) VALUES
  ('seed-work-record-01', 'Notion',                        unixepoch('2026-10-27 17:15', '-9 hours') * 1000, unixepoch('2026-10-27 18:45', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-work-record-02', 'Zodなど',                       unixepoch('2026-10-26 17:30', '-9 hours') * 1000, unixepoch('2026-10-26 18:30', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-work-record-03', 'Notion',                        unixepoch('2026-10-26 07:30', '-9 hours') * 1000, unixepoch('2026-10-26 09:30', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-work-record-04', 'メールとか',                    unixepoch('2026-10-26 07:15', '-9 hours') * 1000, unixepoch('2026-10-26 07:30', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-work-record-05', NULL,                            unixepoch('2026-10-26 00:00', '-9 hours') * 1000, unixepoch('2026-10-26 00:30', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-work-record-06', '今日やったことの整理・API設計', unixepoch('2026-10-25 20:50', '-9 hours') * 1000, unixepoch('2026-10-25 22:30', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-work-record-07', 'Notion',                        unixepoch('2026-10-25 19:50', '-9 hours') * 1000, unixepoch('2026-10-25 20:35', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-work-record-08', 'Notion',                        unixepoch('2026-10-25 18:30', '-9 hours') * 1000, unixepoch('2026-10-25 19:30', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-work-record-09', 'Notion',                        unixepoch('2026-10-25 16:00', '-9 hours') * 1000, unixepoch('2026-10-25 17:00', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-work-record-10', 'Notion',                        unixepoch('2026-10-25 13:45', '-9 hours') * 1000, unixepoch('2026-10-25 16:00', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-work-record-11', '今日の計画',                    unixepoch('2026-10-25 13:30', '-9 hours') * 1000, unixepoch('2026-10-25 13:40', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-work-record-12', 'Notion',                        unixepoch('2026-10-24 23:00', '-9 hours') * 1000, unixepoch('2026-10-25 02:45', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-work-record-13', 'Notion',                        unixepoch('2026-10-24 14:30', '-9 hours') * 1000, unixepoch('2026-10-24 16:00', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-work-record-14', 'DesignDoc',                     unixepoch('2026-10-24 00:00', '-9 hours') * 1000, unixepoch('2026-10-24 01:30', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('seed-work-record-15', '要件定義',                      unixepoch('2026-10-23 23:30', '-9 hours') * 1000, unixepoch('2026-10-24 00:00', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000);

-- 同名のラベルが API で先に作られていても紐付くよう、ラベルは名前で引く
WITH seed (work_record_id, label_name) AS (
  VALUES
    ('seed-work-record-04', 'インターン・就活'),
    ('seed-work-record-05', 'プログラミング'),
    ('seed-work-record-06', 'プログラミング'),
    ('seed-work-record-07', 'プログラミング'),
    ('seed-work-record-08', 'プログラミング'),
    ('seed-work-record-09', 'プログラミング'),
    ('seed-work-record-11', '雑務'),
    ('seed-work-record-14', 'プログラミング'),
    ('seed-work-record-15', 'プログラミング')
)
INSERT OR IGNORE INTO work_record_labels (work_record_id, label_id)
SELECT seed.work_record_id, labels.id
FROM seed
JOIN labels ON labels.name = seed.label_name;
