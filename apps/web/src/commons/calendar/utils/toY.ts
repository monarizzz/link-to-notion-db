import {
  HOUR_HEIGHT,
  MINUTE_MS,
  PADDING_TOP,
} from "@/commons/calendar/constants/dailyCalendar";

/* from からの経過時間を、グリッド上の y 座標（px）にする */
export const toY = (time: number, from: number) =>
  PADDING_TOP + ((time - from) / (60 * MINUTE_MS)) * HOUR_HEIGHT;
