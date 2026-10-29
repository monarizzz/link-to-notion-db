import type { InferRequestType, InferResponseType } from "hono/client";

import type { ApiClient } from "@/infra/api/client";

export type WorkRecord = InferResponseType<
  ApiClient["api"]["work-records"]["$get"],
  200
>[number];

export type CreateWorkRecordInput = InferRequestType<
  ApiClient["api"]["work-records"]["$post"]
>["json"];
