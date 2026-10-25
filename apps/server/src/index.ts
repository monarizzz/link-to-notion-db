import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/labels", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT id, name, color, created_at, updated_at FROM labels ORDER BY created_at",
  ).all();
  return c.json(results, 200);
});

export default app;
