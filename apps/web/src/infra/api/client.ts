import { hc, type InferRequestType, type InferResponseType } from "hono/client";
import type { AppType } from "server/src";

export const apiClient = () => {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API_BASE_URL が設定されていません");
  }

  return hc<AppType>(baseUrl);
};

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
