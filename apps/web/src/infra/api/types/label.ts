import type { InferResponseType } from "hono/client";

import type { ApiClient } from "@/infra/api/client";

export type Label = InferResponseType<
  ApiClient["api"]["labels"]["$get"],
  200
>[number];
