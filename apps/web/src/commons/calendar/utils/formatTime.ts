import dayjs from "dayjs";

import { TZ } from "@/commons/calendar/constants/dailyCalendar";
import "@/libs/dayjs/config";

/* 日本時間の HH:mm にする */
export const formatTime = (value: number | string) =>
  dayjs(value).tz(TZ).format("HH:mm");
