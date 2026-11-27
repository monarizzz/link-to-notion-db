import { useState } from "react";

import {
  HOUR_HEIGHT,
  SNAP_MINUTES,
  TAP_TOLERANCE,
} from "@/commons/calendar/constants/dailyCalendar";

type PointerEvent = React.PointerEvent<HTMLElement>;

/* 選んだ範囲。SNAP_MINUTES 刻みの番号で、end は含まない */
export type SlotRange = { start: number; end: number };

/*
 * 時間帯の選択。返す handlers を、0:00 から始まる要素に付ける。
 * マウスはドラッグで選び、タッチはスクロールと区別するため指を離したときに 1 枠選ぶ
 */
export const useSlotSelection = (
  slots: number,
  onSelect: (selected: SlotRange) => void,
) => {
  const [hover, setHover] = useState<number | null>(null);
  const [anchor, setAnchor] = useState<number | null>(null);
  const [tapY, setTapY] = useState<number | null>(null);

  const toSlot = (e: PointerEvent) => {
    const minutes =
      ((e.clientY - e.currentTarget.getBoundingClientRect().top) /
        HOUR_HEIGHT) *
      60;
    return Math.min(Math.max(Math.floor(minutes / SNAP_MINUTES), 0), slots - 1);
  };

  const between = (a: number, b: number): SlotRange => ({
    start: Math.min(a, b),
    end: Math.max(a, b) + 1,
  });

  const reset = () => {
    setHover(null);
    setAnchor(null);
    setTapY(null);
  };

  const handlers = {
    onPointerDown: (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (e.pointerType !== "mouse") {
        setTapY(e.clientY);
        return;
      }
      e.currentTarget.setPointerCapture(e.pointerId);
      setAnchor(toSlot(e));
      setHover(toSlot(e));
    },
    onPointerMove: (e: PointerEvent) => {
      if (e.pointerType === "mouse") setHover(toSlot(e));
    },
    onPointerUp: (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        if (tapY !== null && Math.abs(e.clientY - tapY) < TAP_TOLERANCE) {
          onSelect(between(toSlot(e), toSlot(e)));
        }
        reset();
        return;
      }
      if (anchor === null) return;
      onSelect(between(anchor, toSlot(e)));
      setAnchor(null);
    },
    onPointerLeave: () => {
      if (anchor === null) setHover(null);
    },
    onPointerCancel: reset,
  };

  const selected = hover === null ? null : between(anchor ?? hover, hover);

  return { selected, handlers };
};
