import { env } from "cloudflare:workers";
import { beforeAll, describe, expect, it } from "vitest";
import app from "../index";

const post = (body: string, contentType = "application/json") =>
  app.request(
    "/api/work-records",
    { method: "POST", headers: { "Content-Type": contentType }, body },
    env,
  );

const postJson = (body: unknown) => post(JSON.stringify(body));

const validBody = {
  started_at: "2026-10-26T10:00:00+09:00",
  ended_at: "2026-10-26T11:00:00+09:00",
};

describe("POST /api/work-records", () => {
  beforeAll(async () => {
    const createdAt = Date.UTC(2026, 9, 26, 1, 0, 0);
    await env.DB.prepare(
      "INSERT INTO labels (id, name, color, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    )
      .bind("label-1", "開発", "#3b82f6", createdAt, createdAt)
      .run();
  });

  describe("正常なボディ", () => {
    it("作業記録を作成して 201 を返す", async () => {
      const res = await postJson({
        ...validBody,
        title: "実装",
        label_ids: ["label-1"],
      });

      expect(res.status).toBe(201);
      expect(await res.json()).toMatchObject({
        title: "実装",
        started_at: "2026-10-26T01:00:00.000Z",
        ended_at: "2026-10-26T02:00:00.000Z",
        labels: [{ id: "label-1", name: "開発", color: "#3b82f6" }],
      });
    });

    it("title の空文字を null にする", async () => {
      const res = await postJson({ ...validBody, title: "" });

      expect(res.status).toBe(201);
      expect(await res.json()).toMatchObject({ title: null });
    });

    it("label_ids の重複を 1 つにまとめる", async () => {
      const res = await postJson({
        ...validBody,
        label_ids: ["label-1", "label-1"],
      });

      expect(res.status).toBe(201);
      expect(await res.json()).toMatchObject({
        labels: [{ id: "label-1" }],
      });
    });

    it("タイムゾーンが無い日時を日本時間として扱う", async () => {
      const res = await postJson({
        started_at: "2026-10-26T10:00",
        ended_at: "2026-10-26T11:00:00",
      });

      expect(res.status).toBe(201);
      expect(await res.json()).toMatchObject({
        started_at: "2026-10-26T01:00:00.000Z",
        ended_at: "2026-10-26T02:00:00.000Z",
      });
    });
  });

  it("Content-Type が JSON でなければ 415 を返す", async () => {
    const res = await post(JSON.stringify(validBody), "text/plain");

    expect(res.status).toBe(415);
    expect(await res.json()).toMatchObject({
      error: { code: "UNSUPPORTED_MEDIA_TYPE" },
    });
  });

  it("JSON として読めなければ 400 を返す", async () => {
    const res = await post("{");

    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({
      error: { code: "INVALID_JSON" },
    });
  });

  it("型が違う項目があれば 400 を返す", async () => {
    const res = await postJson({ ...validBody, title: 1 });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: {
        code: "VALIDATION_ERROR",
        message: "入力内容に誤りがあります",
        fields: { title: ["タイトルは文字列で指定してください"] },
      },
    });
  });

  it("余分なキーがあれば 400 を返す", async () => {
    const res = await postJson({ ...validBody, memo: "x" });

    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({
      error: {
        code: "VALIDATION_ERROR",
        fields: { memo: ["この項目は指定できません"] },
      },
    });
  });

  it("started_at が ended_at 以降なら 422 を返す", async () => {
    const res = await postJson({
      started_at: validBody.ended_at,
      ended_at: validBody.started_at,
    });

    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({
      error: {
        code: "INVALID_TIME_RANGE",
        message: "入力内容に誤りがあります",
        fields: { ended_at: ["終了日時は開始日時より後にしてください"] },
      },
    });
  });

  it("存在しない label_id があれば 422 を返す", async () => {
    const res = await postJson({
      ...validBody,
      label_ids: ["label-1", "missing"],
    });

    expect(res.status).toBe(422);
    expect(await res.json()).toMatchObject({
      error: {
        code: "LABEL_NOT_FOUND",
        fields: { label_ids: ["存在しないラベルが含まれています"] },
      },
    });
  });
});
