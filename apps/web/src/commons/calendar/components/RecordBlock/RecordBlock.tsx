import {
  MIN_EVENT_HEIGHT,
  STACK_MIN_HEIGHT,
} from "@/commons/calendar/constants/dailyCalendar";
import { formatTime } from "@/commons/calendar/utils/formatTime";
import { toY } from "@/commons/calendar/utils/toY";
import type { WorkRecord } from "@/infra/client";

type Props = {
  record: WorkRecord;
  /* 表示する範囲（エポックミリ秒）。はみ出す部分は切って描く */
  range: { from: number; to: number };
};

/* 作業記録 1 件を、開始から終了の長さで描く。表示だけなので、下の時間帯の選択に操作を通す */
const RecordBlock = ({ record, range }: Props) => {
  const start = Math.max(Date.parse(record.started_at), range.from);
  const end = Math.min(Date.parse(record.ended_at), range.to);
  if (start >= end) return null;

  const top = toY(start, range.from);
  const height = Math.max(toY(end, range.from) - top, MIN_EVENT_HEIGHT);
  const stacked = height >= STACK_MIN_HEIGHT;
  const color = record.labels[0]?.color;

  return (
    <div
      className="pointer-events-none absolute right-4 left-22 flex overflow-hidden rounded-lg bg-[#323e4bcc]"
      style={{ top, height }}
    >
      {color && (
        <div className="w-1 shrink-0" style={{ backgroundColor: color }} />
      )}
      <div
        className={`flex min-w-0 flex-1 text-xs ${stacked ? "flex-col justify-center gap-0.5 px-2 py-1.5" : "items-center gap-2 px-3"}`}
      >
        <span className="shrink-0 text-[#A0A0A4]">
          {formatTime(record.started_at)} - {formatTime(record.ended_at)}
        </span>
        {record.title && (
          <span className="truncate font-semibold text-[#FAFAF9]">
            {record.title}
          </span>
        )}
      </div>
    </div>
  );
};

export default RecordBlock;
