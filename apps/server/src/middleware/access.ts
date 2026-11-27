import { createMiddleware } from "hono/factory";
import { verifyWithJwks } from "hono/jwt";

import { errorResponse } from "../errors";

/* Cloudflare Access を通ってきたリクエストかを確かめる */
export const accessJwt = createMiddleware<{ Bindings: CloudflareBindings }>(
  async (c, next) => {
    if (c.env.SKIP_ACCESS_JWT === "true") return await next();

    const token = c.req.header("Cf-Access-Jwt-Assertion");

    if (!token) {
      return errorResponse(c, 401, "UNAUTHORIZED", "認証が必要です");
    }

    try {
      await verifyWithJwks(token, {
        // 署名の検証に使う Access の公開鍵の置き場所
        jwks_uri: `${c.env.ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`,
        allowedAlgorithms: ["RS256"],
        verification: {
          // 自分のチームの Access が発行した JWT か
          iss: c.env.ACCESS_TEAM_DOMAIN,
          //この Access の JWT か（同じチームの別アプリケーションを弾く）
          aud: c.env.ACCESS_AUD,
        },
      });
    } catch {
      return errorResponse(c, 401, "UNAUTHORIZED", "認証が必要です");
    }

    await next();
  },
);
