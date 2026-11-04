import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getJstDayRange } from "./getJstDayRange";

const iso = ({ from, to }: { from: number; to: number }) => ({
  from: new Date(from).toISOString(),
  to: new Date(to).toISOString(),
});

describe("getJstDayRange", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    /* 日本時間では 2026-11-05 の 08:00 */
    vi.setSystemTime(new Date("2026-11-04T23:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("引数が無ければ日本時間の今日 1 日分を返す", () => {
    expect(iso(getJstDayRange())).toEqual({
      from: "2026-11-04T15:00:00.000Z",
      to: "2026-11-05T15:00:00.000Z",
    });
  });

  it("start と end を日本時間の 0 時として返す", () => {
    expect(iso(getJstDayRange("2026-11-01", "2026-11-08"))).toEqual({
      from: "2026-10-31T15:00:00.000Z",
      to: "2026-11-07T15:00:00.000Z",
    });
  });

  it("end が start 以前なら start の翌日までにする", () => {
    expect(iso(getJstDayRange("2026-11-01", "2026-11-01"))).toEqual({
      from: "2026-10-31T15:00:00.000Z",
      to: "2026-11-01T15:00:00.000Z",
    });
  });

  it("形式の違う値は省略と同じに扱う", () => {
    expect(iso(getJstDayRange("2026/11/01", "abc"))).toEqual({
      from: "2026-11-04T15:00:00.000Z",
      to: "2026-11-05T15:00:00.000Z",
    });
  });
});
