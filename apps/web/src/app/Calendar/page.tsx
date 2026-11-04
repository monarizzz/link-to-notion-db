import CalendarPageMain from "@/features/calendarPage/components/CalendarPageMain/CalendarPageMain";
import { toCalendarEvent } from "@/commons/calendar/utils/toCalendarEvent";
import { getJstDayRange } from "@/commons/date/utils/getJstDayRange";
import getLabels from "@/infra/api/getLabels";
import getWorkRecords from "@/infra/api/getWorkRecords";

type Props = {
  searchParams: Promise<{
    s?: string | string[];
    e?: string | string[];
  }>;
};

const CalendarPage = async (props: Props) => {
  const { s, e } = await props.searchParams;
  /* s・e はカレンダーの表示期間（e は含まない）。複数指定は不正な値として扱う */
  const { from, to } = getJstDayRange(
    typeof s === "string" ? s : undefined,
    typeof e === "string" ? e : undefined,
  );
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
