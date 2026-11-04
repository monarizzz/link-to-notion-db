const DAY_MS = 24 * 60 * 60 * 1000;
/* 日本時間は夏時間が無く、常に UTC+9 */
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

/*
 * 日本時間の今日 1 日分の範囲を、エポックミリ秒で返す。to は含まない。
 * dayjs の tz の startOf・add は実行環境の夏時間の影響を受けるため、時差から計算する
 */
export const getJstTodayRange = () => {
  const from =
    Math.floor((Date.now() + JST_OFFSET_MS) / DAY_MS) * DAY_MS - JST_OFFSET_MS;

  return { from, to: from + DAY_MS };
};
