import { describe, expect, it } from "vitest";
import { formSchema } from "./DataForm";

describe("formSchema", () => {
  it("開始時間が終了時間より前なら通る", () => {
    const result = formSchema.safeParse({
      start: "2026-03-24T09:00:00.000+09:00",
      end: "2026-03-24T11:00:00.000+09:00",
    });
    expect(result.success).toBe(true);
  });

  it.each([
    { case: "後", start: "2026-03-24T12:00:00.000+09:00" },
    { case: "同じ", start: "2026-03-24T11:00:00.000+09:00" },
  ])("開始時間が終了時間と$caseなら end にエラーを返す", ({ start }) => {
    const result = formSchema.safeParse({
      start,
      end: "2026-03-24T11:00:00.000+09:00",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([
      expect.objectContaining({
        path: ["end"],
        message: "開始時間は終了時間より前にしてください",
      }),
    ]);
  });
});
