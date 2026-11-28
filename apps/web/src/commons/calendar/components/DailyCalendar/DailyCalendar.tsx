"use client";

import {
  MINUTE_MS,
  PADDING_TOP,
  SNAP_MINUTES,
} from "@/commons/calendar/constants/dailyCalendar";
import { toY } from "@/commons/calendar/utils/toY";
import { useHourHeight } from "@/commons/calendar/utils/useHourHeight";
import { useNow } from "@/commons/calendar/utils/useNow";
import { useSlotSelection } from "@/commons/calendar/utils/useSlotSelection";
import type { WorkRecord } from "@/infra/client";

import NowLabel from "../NowLabel/NowLabel";
import RecordBlock from "../RecordBlock/RecordBlock";
import SelectionBlock from "../SelectionBlock/SelectionBlock";
import TimeGrid from "../TimeGrid/TimeGrid";

type Props = {
  records: WorkRecord[];
  /* 表示する 1 日の範囲（エポックミリ秒）。to は含まない */
  range: { from: number; to: number };
  /* 現在時刻（エポックミリ秒）。省略すると 1 分ごとに更新する */
  now?: number;
  /* 渡すと、ドラッグ（タッチはタップ）で選んだ時間帯（エポックミリ秒）を受け取れる */
  onSelect?: (selected: { start: number; end: number }) => void;
  /* 選んだあとも示しておく時間帯（エポックミリ秒）。登録モーダルを開いている間に使う */
  pending?: { start: number; end: number } | null;
};

const DailyCalendar = ({
  records,
  range,
  now: fixedNow,
  onSelect,
  pending,
}: Props) => {
  const now = useNow(fixedNow);
  const hours = Math.round((range.to - range.from) / (60 * MINUTE_MS));
  const showNow = range.from <= now && now < range.to;
  const { ref, hourHeight } = useHourHeight(hours);

  const slotToTime = (slot: number) =>
    range.from + slot * SNAP_MINUTES * MINUTE_MS;
  const { selected, handlers } = useSlotSelection(
    (hours * 60) / SNAP_MINUTES,
    ({ start, end }) =>
      onSelect?.({ start: slotToTime(start), end: slotToTime(end) }),
  );

  /* 表示する日の中に切る。重ならなければ示さない */
  const shownPending = pending && {
    start: Math.max(pending.start, range.from),
    end: Math.min(pending.end, range.to),
  };

  return (
    <div ref={ref} className="relative h-dvh w-full bg-(--background-2)">
      <TimeGrid
        hours={hours}
        hourHeight={hourHeight}
        hiddenNearY={showNow ? toY(now, range.from, hourHeight) : undefined}
      />
      {onSelect && (
        <div
          className="absolute right-0 left-17.5 cursor-pointer select-none"
          style={{ top: PADDING_TOP, height: hours * hourHeight }}
          {...handlers}
        />
      )}
      {records.map((record) => (
        <RecordBlock
          key={record.id}
          record={record}
          range={range}
          hourHeight={hourHeight}
        />
      ))}
      {shownPending
        ? shownPending.start < shownPending.end && (
            <SelectionBlock
              start={shownPending.start}
              end={shownPending.end}
              from={range.from}
              hourHeight={hourHeight}
            />
          )
        : onSelect &&
          selected && (
            <SelectionBlock
              start={slotToTime(selected.start)}
              end={slotToTime(selected.end)}
              from={range.from}
              hourHeight={hourHeight}
            />
          )}
      {showNow && (
        <NowLabel now={now} from={range.from} hourHeight={hourHeight} />
      )}
    </div>
  );
};

export default DailyCalendar;
