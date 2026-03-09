/* TimeZoneを含まない形式で計算する */
export const diffTime = (start: string, end: string): string => {
  const diff = Math.floor(
    (new Date(end).getTime() - new Date(start).getTime()) / 60000,
  );
  if (isNaN(diff) || diff <= 0) return "-";
  return `${Math.floor(diff / 60)}時間 ${diff % 60}分`;
};
