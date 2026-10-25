import { Hono } from "hono";

type LabelRow = {
  id: string;
  name: string;
  color: string;
  created_at: number;
  updated_at: number;
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

export default app;
