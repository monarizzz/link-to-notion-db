import { afterEach, describe, expect, it, vi } from "vitest";
import { getJstTodayRange } from "./getJstTodayRange";

const iso = ({ from, to }: { from: number; to: number }) => ({
  from: new Date(from).toISOString(),
  to: new Date(to).toISOString(),
});

describe("getJstTodayRange", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("UTC では前日でも、日本時間の今日 1 日分を返す", () => {
    vi.useFakeTimers();
    /* 日本時間では 2026-11-05 の 08:00 */
    vi.setSystemTime(new Date("2026-11-04T23:00:00Z"));

    expect(iso(getJstTodayRange())).toEqual({
      from: "2026-11-04T15:00:00.000Z",
      to: "2026-11-05T15:00:00.000Z",
    });
  });
});
