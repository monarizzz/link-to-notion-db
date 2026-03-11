import { describe, expect, it } from "vitest";

import { timeCalc } from "./timeCalc";

describe("timeCalc", () => {
  describe("isStart = true（開始時刻から終了時刻を算出）", () => {
    it("開始日時に duration を加算した日時を返す", () => {
      const result = timeCalc(
        true,
        "2025-01-01",
        "09:00",
        "2025-01-01",
        "17:00",
        1,
        30,
      );
      expect(result.format("YYYY-MM-DD HH:mm")).toBe("2025-01-01 10:30");
    });

    it("duration が 0 の場合、開始日時をそのまま返す", () => {
      const result = timeCalc(
        true,
        "2025-01-01",
        "09:00",
        "2025-01-01",
        "17:00",
        0,
        0,
      );
      expect(result.format("YYYY-MM-DD HH:mm")).toBe("2025-01-01 09:00");
    });
  });

  describe("isStart = false（終了時刻から開始時刻を算出）", () => {
    it("終了日時から duration を減算した日時を返す", () => {
      const result = timeCalc(
        false,
        "2025-01-01",
        "09:00",
        "2025-01-01",
        "17:00",
        1,
        30,
      );
      expect(result.format("YYYY-MM-DD HH:mm")).toBe("2025-01-01 15:30");
    });

    it("duration が 0 の場合、終了日時をそのまま返す", () => {
      const result = timeCalc(
        false,
        "2025-01-01",
        "09:00",
        "2025-01-01",
        "17:00",
        0,
        0,
      );
      expect(result.format("YYYY-MM-DD HH:mm")).toBe("2025-01-01 17:00");
    });
  });
});
