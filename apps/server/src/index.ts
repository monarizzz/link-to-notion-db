import { Hono } from "hono";
import { workRecordsRouters } from "./routes/workRecords";
import { labelsRouters } from "./routes/labels";
import { accessJwt } from "./middleware/access";

const app = new Hono<{ Bindings: CloudflareBindings }>()
  .basePath("/api")
  .use(accessJwt)
  .route("/work-records", workRecordsRouters)
  .route("/labels", labelsRouters);

/* Hono RPC */
export type AppType = typeof app;

export default app;
