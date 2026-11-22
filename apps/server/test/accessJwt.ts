import { env } from "cloudflare:workers";
import { sign } from "hono/jwt";
import type { JWTPayload } from "hono/utils/jwt/types";

/* Access の代わりに JWT に署名する鍵。kid は Access の公開鍵の一覧から鍵を選ぶのに使われる */
const generateKeyPair = async (kid: string) => {
  const { privateKey, publicKey } = (await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  )) as CryptoKeyPair;
  return {
    privateJwk: {
      ...((await crypto.subtle.exportKey("jwk", privateKey)) as JsonWebKey),
      kid,
      alg: "RS256",
    },
    publicJwk: {
      ...((await crypto.subtle.exportKey("jwk", publicKey)) as JsonWebKey),
      kid,
      alg: "RS256",
    },
  };
};

const accessKey = await generateKeyPair("test-key");
/* 公開鍵の一覧に載っていない鍵。kid を同じにして、署名だけが合わない JWT を作る */
export const otherKey = await generateKeyPair("test-key");

export const certsUrl = `${env.ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`;
export const certsResponse = () =>
  Response.json({ keys: [accessKey.publicJwk] });

/* Access が発行するのと同じ形の JWT を作る。overrides で項目を差し替えてテストする */
export const signAccessJwt = (
  overrides: JWTPayload = {},
  key: { privateJwk: JsonWebKey & { kid: string } } = accessKey,
) => {
  const now = Math.floor(Date.now() / 1000);
  return sign(
    {
      iss: env.ACCESS_TEAM_DOMAIN,
      aud: [env.ACCESS_AUD],
      email: "me@example.com",
      iat: now,
      nbf: now,
      exp: now + 60 * 10,
      ...overrides,
    },
    key.privateJwk,
    "RS256",
  );
};

/* ルートのテストで使う、Access を通ってきたリクエストのヘッダー */
export const accessHeaders = {
  "Cf-Access-Jwt-Assertion": await signAccessJwt(),
};
