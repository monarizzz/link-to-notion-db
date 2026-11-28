import { formatTime } from "@/commons/calendar/utils/formatTime";
import { toY } from "@/commons/calendar/utils/toY";

type Props = {
  now: number;
  from: number;
};

/* 現在時刻の位置に出す時刻ラベル */
const NowLabel = ({ now, from }: Props) => (
  <span
    className="absolute left-2 -translate-y-1/2 bg-(--background-2) text-xs text-accent-lime"
    style={{ top: toY(now, from) }}
  >
    {formatTime(now)}
  </span>
);

export default NowLabel;
