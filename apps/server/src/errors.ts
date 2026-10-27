import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { z } from "zod";

export type ErrorCode =
  "VALIDATION_ERROR" | "INVALID_TIME_RANGE" | "LABEL_NOT_FOUND";

/* fields は項目名をキーにして、フォームの各項目にそのまま表示できるようにする */
export type ErrorFields = Record<string, string[]>;

export const errorResponse = (
  c: Context,
  status: ContentfulStatusCode,
  code: ErrorCode,
  message: string,
  fields: ErrorFields = {},
) => c.json({ error: { code, message, fields } }, status);

/* Zod の issue を項目名ごとにまとめる。余分なキーはそのキー名に付ける */
export const toErrorFields = (error: z.core.$ZodError): ErrorFields => {
  /* キーはクライアントが決めるので、toString などの継承プロパティと衝突しないようにする */
  const fields: ErrorFields = Object.create(null);
  const add = (key: string, message: string) => {
    (fields[key] ??= []).push(message);
  };
  for (const issue of error.issues) {
    if (issue.code === "unrecognized_keys") {
      for (const key of issue.keys) add(key, issue.message);
    } else if (issue.path.length > 0) {
      add(String(issue.path[0]), issue.message);
    }
  }
  return fields;
};
