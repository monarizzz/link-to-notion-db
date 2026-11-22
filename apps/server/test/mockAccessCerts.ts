import { vi } from "vitest";
import { certsResponse, certsUrl } from "./accessJwt";

/* Access の公開鍵の取得を、テスト用の鍵を返すように差し替える */
const originalFetch = globalThis.fetch;
vi.spyOn(globalThis, "fetch").mockImplementation((input, init) => {
  const url = input instanceof Request ? input.url : String(input);
  if (url === certsUrl) return Promise.resolve(certsResponse());
  return originalFetch(input, init);
});
