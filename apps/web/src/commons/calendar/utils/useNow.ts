import { useEffect, useState } from "react";

import { MINUTE_MS } from "@/commons/calendar/constants/dailyCalendar";

/* 現在時刻（エポックミリ秒）。fixed を渡すとその値に固定し、省略すると 1 分ごとに更新する */
export const useNow = (fixed?: number) => {
  const [now, setNow] = useState(() => fixed ?? Date.now());

  useEffect(() => {
    if (fixed !== undefined) return;
    const interval = setInterval(() => setNow(Date.now()), MINUTE_MS);
    return () => clearInterval(interval);
  }, [fixed]);

  return fixed ?? now;
};
