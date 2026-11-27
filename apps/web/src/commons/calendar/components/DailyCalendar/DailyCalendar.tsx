"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

import type { WorkRecord } from "@/infra/client";
import "@/libs/dayjs/config";

/* 1 時間あたりの高さ（px） */
const HOUR_HEIGHT = 32;
/* 0:00 の線より上・24:00 の線より下の余白（px） */
const PADDING_TOP = 24;
const PADDING_BOTTOM = 8;
/* これより低い予定は、時刻とタイトルを横に並べる */
const STACK_MIN_HEIGHT = 40;
const MIN_EVENT_HEIGHT = 16;
/* text-xs の時刻ラベル 1 行の高さ（px） */
const LABEL_HEIGHT = 16;
const MINUTE_MS = 60 * 1000;
const TZ = "Asia/Tokyo";

type Props = {
  records: WorkRecord[];
  /* 表示する 1 日の範囲（エポックミリ秒）。to は含まない */
  range: { from: number; to: number };
  /* 現在時刻（エポックミリ秒）。省略すると 1 分ごとに更新する */
  now?: number;
};

const formatTime = (value: number | string) =>
  dayjs(value).tz(TZ).format("HH:mm");

/* range.from からの経過時間を、グリッド上の y 座標にする */
const toY = (time: number, from: number) =>
  PADDING_TOP + ((time - from) / (60 * MINUTE_MS)) * HOUR_HEIGHT;

const useNow = (fixed?: number) => {
  const [now, setNow] = useState(() => fixed ?? Date.now());

  useEffect(() => {
    if (fixed !== undefined) return;
    const interval = setInterval(() => setNow(Date.now()), MINUTE_MS);
    return () => clearInterval(interval);
  }, [fixed]);

  return fixed ?? now;
};

const DailyCalendar = ({ records, range, now: fixedNow }: Props) => {
  const now = useNow(fixedNow);
  const hours = Math.round((range.to - range.from) / (60 * MINUTE_MS));
  const showNow = range.from <= now && now < range.to;
  const nowY = toY(now, range.from);

  return (
    <div
      className="relative w-full bg-(--background-2)"
      style={{ height: PADDING_TOP + hours * HOUR_HEIGHT + PADDING_BOTTOM }}
    >
      {Array.from({ length: hours + 1 }, (_, i) => {
        const y = PADDING_TOP + i * HOUR_HEIGHT;
        const isEdge = i === 0 || i === hours;
        /* 現在時刻のラベルと重なる時刻ラベルは隠す */
        const hidden = showNow && Math.abs(y - nowY) < LABEL_HEIGHT;
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
      })}

      {records.map((record) => {
        const start = Math.max(Date.parse(record.started_at), range.from);
        const end = Math.min(Date.parse(record.ended_at), range.to);
        if (start >= end) return null;

        const top = toY(start, range.from);
        const height = Math.max(toY(end, range.from) - top, MIN_EVENT_HEIGHT);
        const stacked = height >= STACK_MIN_HEIGHT;
        const color = record.labels[0]?.color;

        return (
          <div
            key={record.id}
            className="absolute right-4 left-22 flex overflow-hidden rounded-lg bg-[#323e4bcc]"
            style={{ top, height }}
          >
            {color && (
              <div
                className="w-1 shrink-0"
                style={{ backgroundColor: color }}
              />
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
      })}

      {showNow && (
        <span
          className="absolute left-2 -translate-y-1/2 bg-(--background-2) text-xs text-accent-lime"
          style={{ top: nowY }}
        >
          {formatTime(now)}
        </span>
      )}
    </div>
  );
};

export default DailyCalendar;
