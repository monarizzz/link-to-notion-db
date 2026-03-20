type DateLabelStyle = {
  bgColor: string;
  textColor: string;
  label: string;
};

export const calcDateLabelStyle = (diff: number): DateLabelStyle => {
  if (diff === 0) return { bgColor: "bg-badge-today/25", textColor: "text-badge-today", label: "今日" };
  if (diff === 1) return { bgColor: "bg-badge-tomorrow/25", textColor: "text-badge-tomorrow", label: "明日" };
  if (diff === -1) return { bgColor: "bg-badge-yesterday/25", textColor: "text-badge-yesterday", label: "昨日" };
  if (diff >= 2 && diff <= 6) return { bgColor: "bg-badge-next-week/25", textColor: "text-badge-next-week", label: `${diff}日後` };
  if (diff <= -2 && diff >= -6) return { bgColor: "bg-badge-last-week/25", textColor: "text-badge-last-week", label: `${Math.abs(diff)}日前` };
  if (diff >= 7 && diff <= 13) return { bgColor: "bg-badge-next-week/25", textColor: "text-badge-next-week", label: "来週" };
  if (diff <= -7 && diff >= -13) return { bgColor: "bg-badge-last-week/25", textColor: "text-badge-last-week", label: "先週" };
  if (diff > 13) return { bgColor: "bg-badge-future/25", textColor: "text-badge-future", label: `${Math.ceil(diff / 7)}週間後` };
  return { bgColor: "bg-badge-past/25", textColor: "text-badge-past", label: `${Math.abs(Math.ceil(diff / 7))}週間前` };
};
