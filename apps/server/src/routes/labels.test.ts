import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";

import { accessHeaders } from "../../test/accessJwt";
import app from "../index";

const postJson = (body: unknown) =>
  app.request(
    "/api/labels",
    {
      method: "POST",
      headers: { ...accessHeaders, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    env,
  );

describe("GET /api/labels", () => {
  beforeAll(async () => {
    const insert = env.DB.prepare(
      "INSERT INTO labels (id, name, color, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    );
    await env.DB.batch([
      insert.bind("get-later", "後に作成", "#222222", 2000, 2000),
      insert.bind("get-earlier", "先に作成", "#111111", 1000, 1000),
    ]);
  });

  it("作成順に id・name・color だけを返す", async () => {
    const res = await app.request(
      "/api/labels",
      { headers: accessHeaders },
      env,
    );

    expect(res.status).toBe(200);
    const labels = (await res.json()) as { id: string }[];
    expect(labels.filter((l) => l.id.startsWith("get-"))).toEqual([
      { id: "get-earlier", name: "先に作成", color: "#111111" },
      { id: "get-later", name: "後に作成", color: "#222222" },
    ]);
  });
});

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

describe("DELETE /api/labels/:id", () => {
  const del = (id: string) =>
    app.request(
      `/api/labels/${id}`,
      { method: "DELETE", headers: accessHeaders },
      env,
    );

  it("ラベルを削除して 204 を返す", async () => {
    const { id } = (await (
      await postJson({ name: "削除用", color: "#111111" })
    ).json()) as { id: string };

    const res = await del(id);

    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
    expect(
      await env.DB.prepare("SELECT id FROM labels WHERE id = ?")
        .bind(id)
        .first(),
    ).toBeNull();
  });

  it("ラベルが無ければ 404 を返す", async () => {
    const res = await del(crypto.randomUUID());

    expect(res.status).toBe(404);
    expect(await res.json()).toMatchObject({
      error: { code: "LABEL_NOT_FOUND" },
    });
  });

  it("ID が UUID でなければ 400 を返す", async () => {
    const res = await del("missing");

    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({
      error: {
        code: "VALIDATION_ERROR",
        fields: { id: ["ラベル ID の形式が正しくありません"] },
      },
    });
  });
});
