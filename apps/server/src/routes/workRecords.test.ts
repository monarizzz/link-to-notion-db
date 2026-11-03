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

beforeAll(async () => {
  const createdAt = Date.UTC(2026, 9, 26, 1, 0, 0);
  await env.DB.prepare(
    "INSERT INTO labels (id, name, color, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
  )
    .bind("label-1", "開発", "#3b82f6", createdAt, createdAt)
    .run();
});

describe("GET /api/work-records", () => {
  const get = (query: string) =>
    app.request(`/api/work-records${query}`, {}, env);

  /* 日本時間の日時をエポックミリ秒にする */
  const jst = (dateTime: string) => new Date(`${dateTime}+09:00`).getTime();

  const from = jst("2030-01-10T00:00");
  const to = jst("2030-01-11T00:00");

  beforeAll(async () => {
    const records = [
      ["range-inside", "2030-01-10T10:00", "2030-01-10T11:00"],
      ["range-cross-from", "2030-01-09T23:00", "2030-01-10T01:00"],
      ["range-cross-to", "2030-01-10T23:00", "2030-01-11T01:00"],
      ["range-cover", "2030-01-09T12:00", "2030-01-11T12:00"],
      ["range-end-at-from", "2030-01-09T22:00", "2030-01-10T00:00"],
      ["range-start-at-to", "2030-01-11T00:00", "2030-01-11T01:00"],
    ] as const;
    const createdAt = Date.UTC(2026, 9, 26, 1, 0, 0);

    await env.DB.batch([
      ...records.map(([id, startedAt, endedAt]) =>
        env.DB.prepare(
          "INSERT INTO work_records (id, title, started_at, ended_at, created_at, updated_at) VALUES (?, NULL, ?, ?, ?, ?)",
        ).bind(id, jst(startedAt), jst(endedAt), createdAt, createdAt),
      ),
      env.DB.prepare(
        "INSERT INTO work_record_labels (work_record_id, label_id) VALUES (?, ?)",
      ).bind("range-inside", "label-1"),
    ]);
  });

  describe("正常なクエリ", () => {
    it("範囲と重なる作業記録を started_at の降順で返す", async () => {
      const res = await get(`?from=${from}&to=${to}`);

      expect(res.status).toBe(200);
      const body = (await res.json()) as { id: string }[];
      expect(body.map(({ id }) => id)).toEqual([
        "range-cross-to",
        "range-inside",
        "range-cross-from",
        "range-cover",
      ]);
    });

    it("ちょうど from に終わる記録と、ちょうど to に始まる記録は返さない", async () => {
      const res = await get(`?from=${from}&to=${to}`);

      const body = (await res.json()) as { id: string }[];
      expect(body.map(({ id }) => id)).not.toContain("range-end-at-from");
      expect(body.map(({ id }) => id)).not.toContain("range-start-at-to");
    });

    it("各記録に紐付いたラベルを含める", async () => {
      const res = await get(`?from=${from}&to=${to}`);

      expect(await res.json()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: "range-inside",
            labels: [{ id: "label-1", name: "開発", color: "#3b82f6" }],
          }),
          expect.objectContaining({ id: "range-cross-to", labels: [] }),
        ]),
      );
    });

    it("余分なクエリは無視する", async () => {
      const res = await get(`?from=${from}&to=${to}&_=1`);

      expect(res.status).toBe(200);
    });
  });

  it("from と to が無ければ 400 を返す", async () => {
    const res = await get("");

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: {
        code: "VALIDATION_ERROR",
        message: "入力内容に誤りがあります",
        fields: {
          from: ["範囲の始まりは必須です"],
          to: ["範囲の終わりは必須です"],
        },
      },
    });
  });

  it.each(["-1", "1.5", "1e12", "0x10", "abc", ""])(
    "from が %s なら 400 を返す",
    async (value) => {
      const res = await get(`?from=${value}&to=${to}`);

      expect(res.status).toBe(400);
      expect(await res.json()).toMatchObject({
        error: {
          code: "VALIDATION_ERROR",
          fields: {
            from: [
              "範囲の始まりは 0 以上の整数（エポックミリ秒）で指定してください",
            ],
          },
        },
      });
    },
  );

  it("Number.MAX_SAFE_INTEGER を超えれば 400 を返す", async () => {
    const res = await get(`?from=${from}&to=9007199254740992`);

    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({
      error: {
        code: "VALIDATION_ERROR",
        fields: { to: ["範囲の終わりが大きすぎます"] },
      },
    });
  });

  it("同じパラメータが複数あれば 400 を返す", async () => {
    const res = await get(`?from=${from}&from=${from}&to=${to}`);

    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({
      error: {
        code: "VALIDATION_ERROR",
        fields: { from: ["範囲の始まりは1つだけ指定してください"] },
      },
    });
  });

  it.each([
    ["from と to が同じ", to],
    ["from が to より後", to + 1],
  ])("%s なら 422 を返す", async (_, value) => {
    const res = await get(`?from=${value}&to=${to}`);

    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({
      error: {
        code: "INVALID_TIME_RANGE",
        message: "入力内容に誤りがあります",
        fields: { to: ["範囲の終わりは範囲の始まりより後にしてください"] },
      },
    });
  });
});

describe("POST /api/work-records", () => {
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

  it("Content-Type が JSON でなければボディを空として扱い 400 を返す", async () => {
    const res = await post(JSON.stringify(validBody), "text/plain");

    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({
      error: { code: "VALIDATION_ERROR" },
    });
  });

  it("JSON として読めなければ Hono 標準のテキストで 400 を返す", async () => {
    const res = await post("{");

    expect(res.status).toBe(400);
    expect(await res.text()).toBe("Malformed JSON in request body");
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

  it.each(["toString", "constructor", "__proto__"])(
    "余分なキーが %s でも 400 を返す",
    async (key) => {
      const res = await post(
        JSON.stringify(validBody).replace(/}$/, `,"${key}":"x"}`),
      );

      expect(res.status).toBe(400);
      const body = (await res.json()) as {
        error: { fields: Record<string, unknown> };
      };
      expect(
        Object.getOwnPropertyDescriptor(body.error.fields, key)?.value,
      ).toEqual(["この項目は指定できません"]);
    },
  );

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

describe("DELETE /api/work-records/:id", () => {
  const del = (id: string) =>
    app.request(`/api/work-records/${id}`, { method: "DELETE" }, env);

  it("作業記録を削除して 204 を返す", async () => {
    const { id } = (await (
      await postJson({ ...validBody, label_ids: ["label-1"] })
    ).json()) as { id: string };

    const res = await del(id);

    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
    expect(
      await env.DB.prepare("SELECT id FROM work_records WHERE id = ?")
        .bind(id)
        .first(),
    ).toBeNull();
  });

  it("ラベルとの紐付けも削除する", async () => {
    const { id } = (await (
      await postJson({ ...validBody, label_ids: ["label-1"] })
    ).json()) as { id: string };

    await del(id);

    expect(
      await env.DB.prepare(
        "SELECT work_record_id FROM work_record_labels WHERE work_record_id = ?",
      )
        .bind(id)
        .first(),
    ).toBeNull();
  });

  it("存在しない id なら 404 を返す", async () => {
    const res = await del("missing");

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({
      error: {
        code: "WORK_RECORD_NOT_FOUND",
        message: "作業記録が見つかりません",
        fields: {},
      },
    });
  });
});
