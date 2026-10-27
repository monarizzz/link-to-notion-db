import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { errorResponse, toErrorFields } from "../errors";
import { createWorkRecordSchema } from "../schemas/workRecords";

type WorkRecordRow = {
  id: string;
  title: string | null;
  started_at: number;
  ended_at: number;
  created_at: number;
  updated_at: number;
};

type WorkRecordLabelRow = {
  work_record_id: string;
  id: string;
  name: string;
  color: string;
};

export const workRecordsRouters = new Hono<{
  Bindings: CloudflareBindings;
}>()
  /* 作業記録の全件取得 */
  .get("/", async (c) => {
    const [records, recordLabels] = await c.env.DB.batch([
      c.env.DB.prepare(
        "SELECT id, title, started_at, ended_at, created_at, updated_at FROM work_records ORDER BY started_at DESC",
      ),
      c.env.DB.prepare(
        "SELECT work_record_labels.work_record_id, labels.id, labels.name, labels.color FROM work_record_labels JOIN labels ON labels.id = work_record_labels.label_id ORDER BY labels.created_at",
      ),
    ]);
    const workRecords = (records.results as WorkRecordRow[]).map((row) => ({
      ...row,
      started_at: new Date(row.started_at).toISOString(),
      ended_at: new Date(row.ended_at).toISOString(),
      created_at: new Date(row.created_at).toISOString(),
      updated_at: new Date(row.updated_at).toISOString(),
      labels: (recordLabels.results as WorkRecordLabelRow[])
        .filter((label) => label.work_record_id === row.id)
        .map(({ id, name, color }) => ({ id, name, color })),
    }));
    return c.json(workRecords, 200);
  })

  /* 作業記録の追加 */
  .post(
    "/",
    zValidator("json", createWorkRecordSchema, (result, c) => {
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
      const { title, started_at, ended_at, label_ids } = c.req.valid("json");

      if (started_at >= ended_at) {
        return errorResponse(
          c,
          422,
          "INVALID_TIME_RANGE",
          "入力内容に誤りがあります",
          { ended_at: ["終了日時は開始日時より後にしてください"] },
        );
      }

      if (label_ids.length > 0) {
        const { results: existingLabels } = await c.env.DB.prepare(
          `SELECT id FROM labels WHERE id IN (${label_ids.map(() => "?").join(", ")})`,
        )
          .bind(...label_ids)
          .all<{ id: string }>();
        if (existingLabels.length !== label_ids.length) {
          return errorResponse(
            c,
            422,
            "LABEL_NOT_FOUND",
            "入力内容に誤りがあります",
            { label_ids: ["存在しないラベルが含まれています"] },
          );
        }
      }

      const id = crypto.randomUUID();
      const now = Date.now();

      await c.env.DB.batch([
        c.env.DB.prepare(
          "INSERT INTO work_records (id, title, started_at, ended_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
        ).bind(id, title, started_at, ended_at, now, now),
        ...label_ids.map((labelId) =>
          c.env.DB.prepare(
            "INSERT INTO work_record_labels (work_record_id, label_id) VALUES (?, ?)",
          ).bind(id, labelId),
        ),
      ]);

      const { results: labels } = await c.env.DB.prepare(
        "SELECT labels.id, labels.name, labels.color FROM work_record_labels JOIN labels ON labels.id = work_record_labels.label_id WHERE work_record_labels.work_record_id = ? ORDER BY labels.created_at",
      )
        .bind(id)
        .all();

      return c.json(
        {
          id,
          title,
          started_at: new Date(started_at).toISOString(),
          ended_at: new Date(ended_at).toISOString(),
          created_at: new Date(now).toISOString(),
          updated_at: new Date(now).toISOString(),
          labels,
        },
        201,
      );
    },
  );
