export const calcBgColor = (diff: number): string => {
  if (diff === 0) return "bg-badge-today/25";
  if (diff === 1) return "bg-badge-tomorrow/25";
  if (diff === -1) return "bg-badge-yesterday/25";
  if (diff >= 2 && diff <= 13) return "bg-badge-next-week/25";
  if (diff <= -2 && diff >= -13) return "bg-badge-last-week/25";
  if (diff > 13) return "bg-badge-future/25";
  return "bg-badge-past/25";
};

export const calcTextColor = (diff: number): string => {
  if (diff === 0) return "text-badge-today";
  if (diff === 1) return "text-badge-tomorrow";
  if (diff === -1) return "text-badge-yesterday";
  if (diff >= 2 && diff <= 13) return "text-badge-next-week";
  if (diff <= -2 && diff >= -13) return "text-badge-last-week";
  if (diff > 13) return "text-badge-future";
  return "text-badge-past";
};

export const calcDate = (diff: number): string => {
  if (diff === 0) return "今日";
  if (diff === 1) return "明日";
  if (diff === -1) return "昨日";
  if (diff >= 2 && diff <= 13) return "来週";
  if (diff <= -2 && diff >= -13) return "先週";
  if (diff > 13) return `${Math.ceil(diff / 7)}週間後`;
  return `${Math.abs(Math.ceil(diff / 7))}週間前`;
};
