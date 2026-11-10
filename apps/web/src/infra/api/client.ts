import { getCloudflareContext } from "@opennextjs/cloudflare";
import { hc, type InferRequestType, type InferResponseType } from "hono/client";
import type { AppType } from "server/src";

type ServiceBinding = { fetch: typeof fetch };

/* Workers 上で動いているときだけ、API への Service Binding を返す */
const getApiBinding = (): ServiceBinding | undefined => {
  try {
    const env = getCloudflareContext().env as { API?: ServiceBinding };
    return env.API;
  } catch {
    // next dev・Vercel では Cloudflare のコンテキストが無い
    return undefined;
  }
};

export const apiClient = () => {
  const binding = getApiBinding();

  if (binding) {
    // Service Binding ではホスト名は使われないため、任意の URL でよい
    return hc<AppType>("https://api.internal", {
      fetch: binding.fetch.bind(binding),
    });
  }

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
