import { env } from "cloudflare:workers";
import { describe, expect, it } from "vitest";
import app from "../index";

describe("GET /api/labels", () => {
  it("登録されているラベルを日時を ISO 8601 に変換して返す", async () => {
    const createdAt = Date.UTC(2026, 9, 26, 1, 0, 0);
    await env.DB.prepare(
      "INSERT INTO labels (id, name, color, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    )
      .bind("label-1", "開発", "#3b82f6", createdAt, createdAt)
      .run();

    const res = await app.request("/api/labels", {}, env);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([
      {
        id: "label-1",
        name: "開発",
        color: "#3b82f6",
        created_at: "2026-10-26T01:00:00.000Z",
        updated_at: "2026-10-26T01:00:00.000Z",
      },
    ]);
  });
});
