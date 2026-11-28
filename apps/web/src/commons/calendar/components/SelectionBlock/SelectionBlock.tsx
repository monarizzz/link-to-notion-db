import { MIN_EVENT_HEIGHT } from "@/commons/calendar/constants/dailyCalendar";
import { formatTime } from "@/commons/calendar/utils/formatTime";
import { toY } from "@/commons/calendar/utils/toY";

type Props = {
  /* 選んでいる時間帯（エポックミリ秒） */
  start: number;
  end: number;
  from: number;
  hourHeight: number;
};

/* ホバー・ドラッグで選んでいる時間帯 */
const SelectionBlock = ({ start, end, from, hourHeight }: Props) => {
  const top = toY(start, from, hourHeight);
  return (
    <div
      className="pointer-events-none absolute right-4 left-22 flex items-center rounded-lg border border-accent-lime/40 bg-accent-lime/15 px-3 text-xs text-accent-lime"
      style={{
        top,
        height: Math.max(toY(end, from, hourHeight) - top, MIN_EVENT_HEIGHT),
      }}
    >
      {formatTime(start)} - {formatTime(end)}
    </div>
  );
};

export default SelectionBlock;
