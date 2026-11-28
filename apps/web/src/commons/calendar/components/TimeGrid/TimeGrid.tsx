import {
  LABEL_HEIGHT,
  PADDING_TOP,
} from "@/commons/calendar/constants/dailyCalendar";

type Props = {
  hours: number;
  hourHeight: number;
  /* この y 座標（px）と重なる時刻ラベルは隠す。現在時刻のラベル用 */
  hiddenNearY?: number;
};

/* 時刻ラベルと 1 時間ごとの区切り線 */
const TimeGrid = ({ hours, hourHeight, hiddenNearY }: Props) =>
  Array.from({ length: hours + 1 }, (_, i) => {
    const y = PADDING_TOP + i * hourHeight;
    const isEdge = i === 0 || i === hours;
    const hidden =
      hiddenNearY !== undefined && Math.abs(y - hiddenNearY) < LABEL_HEIGHT;
    return (
      <div key={i}>
        <span
          className={`absolute left-2 -translate-y-1/2 text-xs ${isEdge ? "text-[#6B8AAD]" : "text-[#878787]"} ${hidden ? "invisible" : ""}`}
          style={{ top: y }}
        >
          {i % 24}:00
        </span>
        <div
          className="absolute right-0 left-17.5 h-px bg-[#2A2A2A]"
          style={{ top: y }}
        />
      </div>
    );
  });

export default TimeGrid;
