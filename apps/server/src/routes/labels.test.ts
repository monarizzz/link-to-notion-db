import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import app from "../index";

const postJson = (body: unknown) =>
  app.request(
    "/api/labels",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    env,
  );

describe("POST /api/labels", () => {
  beforeAll(async () => {
    const createdAt = Date.UTC(2026, 9, 26, 1, 0, 0);
    await env.DB.prepare(
      "INSERT INTO labels (id, name, color, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    )
      .bind("label-1", "開発", "#3b82f6", createdAt, createdAt)
      .run();
  });

  it("ラベルを作成して 201 を返す", async () => {
    const res = await postJson({ name: " 学習 ", color: "#22C55E" });

    expect(res.status).toBe(201);
    expect(await res.json()).toMatchObject({ name: "学習", color: "#22c55e" });
  });

  it("必須項目が無ければ 400 を返す", async () => {
    const res = await postJson({});

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: {
        code: "VALIDATION_ERROR",
        message: "入力内容に誤りがあります",
        fields: { name: ["ラベル名は必須です"], color: ["色は必須です"] },
      },
    });
  });

  it("色が #rrggbb 形式でなければ 400 を返す", async () => {
    const res = await postJson({ name: "読書", color: "blue" });

    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({
      error: { fields: { color: ["色は #rrggbb 形式で指定してください"] } },
    });
  });

  it("余分なキーがあれば 400 を返す", async () => {
    const res = await postJson({ name: "読書", color: "#000000", id: "x" });

    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({
      error: { fields: { id: ["この項目は指定できません"] } },
    });
  });

  it("同じ名前のラベルがあれば 409 を返す", async () => {
    const res = await postJson({ name: "開発", color: "#000000" });

    expect(res.status).toBe(409);
    expect(await res.json()).toMatchObject({
      error: { code: "LABEL_NAME_CONFLICT" },
    });
  });
});
