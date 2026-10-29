import { hc } from "hono/client";
import type { AppType } from "server/src";

export const apiClient = () => {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API_BASE_URL が設定されていません");
  }

  return hc<AppType>(baseUrl);
};

export type ApiClient = ReturnType<typeof apiClient>;
