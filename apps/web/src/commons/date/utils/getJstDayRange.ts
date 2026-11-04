import dayjs from "dayjs";
import "@/libs/dayjs/config";

const TIME_ZONE = "Asia/Tokyo";

const isDate = (value?: string): value is string =>
  !!value && /^\d{4}-\d{2}-\d{2}$/.test(value) && dayjs(value).isValid();

/*
 * 日本時間の日付（YYYY-MM-DD）から、範囲の端をエポックミリ秒で返す。
 * start は含み、end は含まない。省略・不正な値なら start は今日、end は start の翌日にする
 */
export const getJstDayRange = (start?: string, end?: string) => {
  const from = isDate(start)
    ? dayjs.tz(start, TIME_ZONE)
    : dayjs().tz(TIME_ZONE).startOf("day");
  /* add(1, "day") は実行環境の夏時間の影響を受ける。日本時間に夏時間は無いため 24 時間を足す */
  const to =
    isDate(end) && dayjs.tz(end, TIME_ZONE).isAfter(from)
      ? dayjs.tz(end, TIME_ZONE)
      : from.add(24, "hour");

  return { from: from.valueOf(), to: to.valueOf() };
};
