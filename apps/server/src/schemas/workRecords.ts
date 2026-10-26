import { z } from "zod";

/* タイムゾーンの無い日時は日本時間として扱う */
const dateTime = (label: string) =>
  z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? `${label}は必須です`
          : `${label}は文字列で指定してください`,
    })
    .pipe(
      z.iso.datetime({
        offset: true,
        local: true,
        error: `${label}は ISO 8601 形式の日時で指定してください`,
      }),
    )
    .transform((value) =>
      new Date(
        /(Z|[+-]\d{2}:\d{2})$/.test(value) ? value : `${value}+09:00`,
      ).getTime(),
    );

export const createWorkRecordSchema = z.strictObject(
  {
    title: z
      .string({ error: "タイトルは文字列で指定してください" })
      .nullish()
      .transform((value) => value || null),
    started_at: dateTime("開始日時"),
    ended_at: dateTime("終了日時"),
    label_ids: z
      .array(z.string({ error: "ラベル ID は文字列で指定してください" }), {
        error: "ラベル ID は配列で指定してください",
      })
      .nullish()
      .transform((value) => [...new Set(value ?? [])]),
  },
  {
    error: (issue) =>
      issue.code === "unrecognized_keys"
        ? "この項目は指定できません"
        : "リクエストボディはオブジェクトで指定してください",
  },
);

export type CreateWorkRecordInput = z.infer<typeof createWorkRecordSchema>;
