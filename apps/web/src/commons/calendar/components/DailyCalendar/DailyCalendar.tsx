"use client";

import {
  HOUR_HEIGHT,
  MINUTE_MS,
  PADDING_BOTTOM,
  PADDING_TOP,
} from "@/commons/calendar/constants/dailyCalendar";
import { toY } from "@/commons/calendar/utils/toY";
import { useNow } from "@/commons/calendar/utils/useNow";
import type { WorkRecord } from "@/infra/client";

import NowLabel from "../NowLabel/NowLabel";
import RecordBlock from "../RecordBlock/RecordBlock";
import TimeGrid from "../TimeGrid/TimeGrid";

type Props = {
  records: WorkRecord[];
  /* 表示する 1 日の範囲（エポックミリ秒）。to は含まない */
  range: { from: number; to: number };
  /* 現在時刻（エポックミリ秒）。省略すると 1 分ごとに更新する */
  now?: number;
};

const DailyCalendar = ({ records, range, now: fixedNow }: Props) => {
  const now = useNow(fixedNow);
  const hours = Math.round((range.to - range.from) / (60 * MINUTE_MS));
  const showNow = range.from <= now && now < range.to;

  return (
    <div
      className="relative w-full bg-(--background-2)"
      style={{ height: PADDING_TOP + hours * HOUR_HEIGHT + PADDING_BOTTOM }}
    >
      <TimeGrid
        hours={hours}
        hiddenNearY={showNow ? toY(now, range.from) : undefined}
      />
      {records.map((record) => (
        <RecordBlock key={record.id} record={record} range={range} />
      ))}
      {showNow && <NowLabel now={now} from={range.from} />}
    </div>
  );
};

export default DailyCalendar;
