import CalendarPageMain from "@/features/calendarPage/components/CalendarPageMain/CalendarPageMain";
import { toCalendarEvent } from "@/commons/calendar/utils/toCalendarEvent";
import { getJstTodayRange } from "@/commons/date/utils/getJstTodayRange";
import getLabels from "@/infra/api/getLabels";
import getWorkRecords from "@/infra/api/getWorkRecords";

type Props = {
  searchParams: Promise<{
    from?: string | string[];
    to?: string | string[];
  }>;
};

const isEpochMillis = (value?: string | string[]): value is string =>
  typeof value === "string" && /^\d+$/.test(value);

const CalendarPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  /* from・to はカレンダーの表示期間。無い（初回表示）か不正なら今日にする */
  const { from, to } =
    isEpochMillis(searchParams.from) && isEpochMillis(searchParams.to)
      ? { from: Number(searchParams.from), to: Number(searchParams.to) }
      : getJstTodayRange();
  const [labels, workRecords] = await Promise.all([
    getLabels(),
    getWorkRecords(from, to),
  ]);

  return (
    <CalendarPageMain
      labels={labels}
      events={workRecords.map(toCalendarEvent)}
    />
  );
};

export default CalendarPage;
