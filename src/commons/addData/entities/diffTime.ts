export const diffTime = (start: string, end: string): string => {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const diff = eh * 60 + em - (sh * 60 + sm);
  if (diff <= 0) return "-";
  return `${Math.floor(diff / 60)}時間 ${diff % 60}分`;
};
