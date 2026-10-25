import { Hono } from "hono";
import { workRecordsRouters } from "./routes/workRecords";
import { labelsRouters } from "./routes/labels";

const app = new Hono<{ Bindings: CloudflareBindings }>()
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/work-records", workRecordsRouters)
  .route("/labels", labelsRouters);

export default app;
