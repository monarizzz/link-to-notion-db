import { Hono } from "hono";

type LabelRow = {
  id: string;
  name: string;
  color: string;
  created_at: number;
  updated_at: number;
};

type WorkRecordRow = {
  id: string;
  title: string;
  started_at: number;
  ended_at: number | null;
  created_at: number;
  updated_at: number;
};

type WorkRecordLabelRow = {
  work_record_id: string;
  id: string;
  name: string;
  color: string;
};

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/labels", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT id, name, color, created_at, updated_at FROM labels ORDER BY created_at",
  ).all<LabelRow>();
  const labels = results.map((row) => ({
    ...row,
    created_at: new Date(row.created_at).toISOString(),
    updated_at: new Date(row.updated_at).toISOString(),
  }));
  return c.json(labels, 200);
});

app.get("/work-records", async (c) => {
  const [records, recordLabels] = await c.env.DB.batch([
    c.env.DB.prepare(
      "SELECT id, title, started_at, ended_at, created_at, updated_at FROM work_records ORDER BY started_at DESC",
    ),
    c.env.DB.prepare(
      "SELECT work_record_labels.work_record_id, labels.id, labels.name, labels.color FROM work_record_labels JOIN labels ON labels.id = work_record_labels.label_id ORDER BY labels.created_at",
    ),
  ]);
  const workRecords = (records.results as WorkRecordRow[]).map((row) => ({
    ...row,
    started_at: new Date(row.started_at).toISOString(),
    ended_at:
      row.ended_at === null ? null : new Date(row.ended_at).toISOString(),
    created_at: new Date(row.created_at).toISOString(),
    updated_at: new Date(row.updated_at).toISOString(),
    labels: (recordLabels.results as WorkRecordLabelRow[])
      .filter((label) => label.work_record_id === row.id)
      .map(({ id, name, color }) => ({ id, name, color })),
  }));
  return c.json(workRecords, 200);
});

export default app;
