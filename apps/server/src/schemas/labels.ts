import { z } from "zod";

export const createLabelSchema = z.strictObject(
  {
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "ラベル名は必須です"
            : "ラベル名は文字列で指定してください",
      })
      .trim()
      .min(1, { error: "ラベル名を入力してください" }),
    color: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "色は必須です"
            : "色は文字列で指定してください",
      })
      .regex(/^#[0-9a-fA-F]{6}$/, {
        error: "色は #rrggbb 形式で指定してください",
      })
      .transform((value) => value.toLowerCase()),
  },
  {
    error: (issue) =>
      issue.code === "unrecognized_keys"
        ? "この項目は指定できません"
        : "リクエストボディはオブジェクトで指定してください",
  },
);

export type CreateLabelInput = z.infer<typeof createLabelSchema>;
