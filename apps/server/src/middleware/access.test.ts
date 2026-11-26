import { env } from "cloudflare:workers";
import { Hono } from "hono";
import { describe, expect, it } from "vitest";
import { otherKey, signAccessJwt } from "../../test/accessJwt";
import { accessJwt } from "./access";

const app = new Hono<{ Bindings: CloudflareBindings }>()
  .use(accessJwt)
  .get("/", (c) => c.text("ok"));

const request = (token?: string) =>
  app.request(
    "/",
    { headers: token ? { "Cf-Access-Jwt-Assertion": token } : {} },
    env,
  );

const requestWithSkip = (skip: string) =>
  app.request("/", {}, { ...env, SKIP_ACCESS_JWT: skip });

const expectUnauthorized = async (res: Response) => {
  expect(res.status).toBe(401);
  expect(await res.json()).toEqual({
    error: { code: "UNAUTHORIZED", message: "認証が必要です", fields: {} },
  });
};

describe("accessJwt", () => {
  it("Access が発行した有効な JWT なら通す", async () => {
    const res = await request(await signAccessJwt());

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("ok");
  });

  it("ヘッダーが無ければ 401 を返す", async () => {
    await expectUnauthorized(await request());
  });

  it("SKIP_ACCESS_JWT が true なら JWT が無くても通す", async () => {
    const res = await requestWithSkip("true");

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("ok");
  });

  it("SKIP_ACCESS_JWT が true 以外なら検証する", async () => {
    await expectUnauthorized(await requestWithSkip("false"));
  });

  it("JWT として読めない値なら 401 を返す", async () => {
    await expectUnauthorized(await request("not-a-jwt"));
  });

  it("公開鍵と合わない鍵で署名されていれば 401 を返す", async () => {
    await expectUnauthorized(await request(await signAccessJwt({}, otherKey)));
  });

  it("iss が自分のチームドメインでなければ 401 を返す", async () => {
    const token = await signAccessJwt({
      iss: "https://other.cloudflareaccess.com",
    });

    await expectUnauthorized(await request(token));
  });

  it("aud が自分の Access アプリケーションでなければ 401 を返す", async () => {
    const token = await signAccessJwt({ aud: ["other-application"] });

    await expectUnauthorized(await request(token));
  });

  it("期限切れなら 401 を返す", async () => {
    const now = Math.floor(Date.now() / 1000);
    const token = await signAccessJwt({
      iat: now - 60 * 20,
      nbf: now - 60 * 20,
      exp: now - 60 * 10,
    });

    await expectUnauthorized(await request(token));
  });
});
