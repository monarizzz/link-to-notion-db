import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { errorResponse, toErrorFields } from "../errors";
import { createLabelSchema } from "../schemas/labels";

type LabelRow = {
  id: string;
  name: string;
  color: string;
  created_at: number;
  updated_at: number;
};

export const labelsRouters = new Hono<{
  Bindings: CloudflareBindings;
}>()
  /* 作業に付与するラベルの全件取得 */
  .get("/", async (c) => {
    const { results } = await c.env.DB.prepare(
      "SELECT id, name, color, created_at, updated_at FROM labels ORDER BY created_at",
    ).all<LabelRow>();
    const labels = results.map((row) => ({
      ...row,
      created_at: new Date(row.created_at).toISOString(),
      updated_at: new Date(row.updated_at).toISOString(),
    }));
    return c.json(labels, 200);
  })

  /* ラベルの追加 */
  .post(
    "/",
    zValidator("json", createLabelSchema, (result, c) => {
      if (!result.success) {
        return errorResponse(
          c,
          400,
          "VALIDATION_ERROR",
          "入力内容に誤りがあります",
          toErrorFields(result.error),
        );
      }
    }),
    async (c) => {
      const { name, color } = c.req.valid("json");

      const existing = await c.env.DB.prepare(
        "SELECT id FROM labels WHERE name = ?",
      )
        .bind(name)
        .first();
      if (existing) {
        return errorResponse(
          c,
          409,
          "LABEL_NAME_CONFLICT",
          "入力内容に誤りがあります",
          { name: ["同じ名前のラベルが既にあります"] },
        );
      }

      const id = crypto.randomUUID();
      const now = Date.now();

      await c.env.DB.prepare(
        "INSERT INTO labels (id, name, color, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
      )
        .bind(id, name, color, now, now)
        .run();

      return c.json(
        {
          id,
          name,
          color,
          created_at: new Date(now).toISOString(),
          updated_at: new Date(now).toISOString(),
        },
        201,
      );
    },
  );
