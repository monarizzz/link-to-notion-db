import { calcDayDiff } from "./calcDayDiff";

export const calcDate = (date: Date): string => {
  const diff = calcDayDiff(date);

  if (diff === 0) return "今日";
  if (diff === 1) return "明日";
  if (diff === -1) return "昨日";
  if (diff >= 2 && diff <= 6) return "来週";
  if (diff <= -2 && diff >= -6) return "先週";
  if (diff >= 7) return `${Math.round(diff / 7)}週間先`;
  return `${Math.round(-diff / 7)}週間前`;
};
