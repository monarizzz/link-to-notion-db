-- 開発用の初期データ
-- ID を固定して INSERT OR IGNORE するため、再実行しても重複せず、既存データも消さない
-- ID は API と同じ UUID 形式にする。ラベルは a000、作業記録は b000 のグループで区別する
-- 日時は日本時間で書き、-9 hours で UTC に直してからミリ秒の UNIX 時間にする

INSERT OR IGNORE INTO labels (id, name, color, created_at, updated_at) VALUES
  ('00000000-0000-4000-a000-000000000001', 'プログラミング',   '#8a6a2b', unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-a000-000000000002', 'インターン・就活', '#3d5a8a', unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-a000-000000000003', '雑務',             '#3f6b4f', unixepoch('now') * 1000, unixepoch('now') * 1000);

INSERT OR IGNORE INTO work_records (id, title, started_at, ended_at, created_at, updated_at) VALUES
  ('00000000-0000-4000-b000-000000000001', 'Notion',                        unixepoch('2026-10-27 17:15', '-9 hours') * 1000, unixepoch('2026-10-27 18:45', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-b000-000000000002', 'Zodなど',                       unixepoch('2026-10-26 17:30', '-9 hours') * 1000, unixepoch('2026-10-26 18:30', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-b000-000000000003', 'Notion',                        unixepoch('2026-10-26 07:30', '-9 hours') * 1000, unixepoch('2026-10-26 09:30', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-b000-000000000004', 'メールとか',                    unixepoch('2026-10-26 07:15', '-9 hours') * 1000, unixepoch('2026-10-26 07:30', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-b000-000000000005', NULL,                            unixepoch('2026-10-26 00:00', '-9 hours') * 1000, unixepoch('2026-10-26 00:30', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-b000-000000000006', '今日やったことの整理・API設計', unixepoch('2026-10-25 20:50', '-9 hours') * 1000, unixepoch('2026-10-25 22:30', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-b000-000000000007', 'Notion',                        unixepoch('2026-10-25 19:50', '-9 hours') * 1000, unixepoch('2026-10-25 20:35', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-b000-000000000008', 'Notion',                        unixepoch('2026-10-25 18:30', '-9 hours') * 1000, unixepoch('2026-10-25 19:30', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-b000-000000000009', 'Notion',                        unixepoch('2026-10-25 16:00', '-9 hours') * 1000, unixepoch('2026-10-25 17:00', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-b000-000000000010', 'Notion',                        unixepoch('2026-10-25 13:45', '-9 hours') * 1000, unixepoch('2026-10-25 16:00', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-b000-000000000011', '今日の計画',                    unixepoch('2026-10-25 13:30', '-9 hours') * 1000, unixepoch('2026-10-25 13:40', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-b000-000000000012', 'Notion',                        unixepoch('2026-10-24 23:00', '-9 hours') * 1000, unixepoch('2026-10-25 02:45', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-b000-000000000013', 'Notion',                        unixepoch('2026-10-24 14:30', '-9 hours') * 1000, unixepoch('2026-10-24 16:00', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-b000-000000000014', 'DesignDoc',                     unixepoch('2026-10-24 00:00', '-9 hours') * 1000, unixepoch('2026-10-24 01:30', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000),
  ('00000000-0000-4000-b000-000000000015', '要件定義',                      unixepoch('2026-10-23 23:30', '-9 hours') * 1000, unixepoch('2026-10-24 00:00', '-9 hours') * 1000, unixepoch('now') * 1000, unixepoch('now') * 1000);

-- 同名のラベルが API で先に作られていても紐付くよう、ラベルは名前で引く
WITH seed (work_record_id, label_name) AS (
  VALUES
    ('00000000-0000-4000-b000-000000000004', 'インターン・就活'),
    ('00000000-0000-4000-b000-000000000005', 'プログラミング'),
    ('00000000-0000-4000-b000-000000000006', 'プログラミング'),
    ('00000000-0000-4000-b000-000000000007', 'プログラミング'),
    ('00000000-0000-4000-b000-000000000008', 'プログラミング'),
    ('00000000-0000-4000-b000-000000000009', 'プログラミング'),
    ('00000000-0000-4000-b000-000000000011', '雑務'),
    ('00000000-0000-4000-b000-000000000014', 'プログラミング'),
    ('00000000-0000-4000-b000-000000000015', 'プログラミング')
)
INSERT OR IGNORE INTO work_record_labels (work_record_id, label_id)
SELECT seed.work_record_id, labels.id
FROM seed
JOIN labels ON labels.name = seed.label_name;
