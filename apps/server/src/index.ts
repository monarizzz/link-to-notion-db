import { Hono } from "hono";

import { accessJwt } from "./middleware/access";
import { labelsRouters } from "./routes/labels";
import { workRecordsRouters } from "./routes/workRecords";

const app = new Hono<{ Bindings: CloudflareBindings }>()
  .basePath("/api")
  .use(accessJwt)
  .route("/work-records", workRecordsRouters)
  .route("/labels", labelsRouters);

/* Hono RPC */
export type AppType = typeof app;

export default app;
