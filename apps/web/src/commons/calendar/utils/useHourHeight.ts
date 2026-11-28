import { useEffect, useRef, useState } from "react";

import {
  DEFAULT_HOUR_HEIGHT,
  PADDING_BOTTOM,
  PADDING_TOP,
} from "@/commons/calendar/constants/dailyCalendar";

/* 返す ref を付けた要素の高さに hours 時間分が収まるよう、1 時間あたりの高さ（px）を求める */
export const useHourHeight = (hours: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hourHeight, setHourHeight] = useState(DEFAULT_HOUR_HEIGHT);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setHourHeight(
        (entry.contentRect.height - PADDING_TOP - PADDING_BOTTOM) / hours,
      ),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [hours]);

  return { ref, hourHeight };
};
