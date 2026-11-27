import { hc, type InferRequestType, type InferResponseType } from "hono/client";
import type { AppType } from "server/src";

export const apiClient = () => hc<AppType>("/");

export type ApiClient = ReturnType<typeof apiClient>;

export type Label = InferResponseType<
  ApiClient["api"]["labels"]["$get"],
  200
>[number];

export type WorkRecord = InferResponseType<
  ApiClient["api"]["work-records"]["$get"],
  200
>[number];

export type CreateWorkRecordInput = InferRequestType<
  ApiClient["api"]["work-records"]["$post"]
>["json"];
