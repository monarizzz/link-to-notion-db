import type { CalendarEvent } from "@/commons/calendar/types/calendarEvent";
import type { WorkRecord } from "@/infra/api/client";

/* タイトルの無い記録は空文字にし、カレンダーには時間だけを出す */
export const toCalendarEvent = (record: WorkRecord): CalendarEvent => ({
  id: record.id,
  title: record.title ?? "",
  start: record.started_at,
  end: record.ended_at,
});
