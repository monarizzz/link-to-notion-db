import { getCurrent } from "@/commons/date/utils/getCurrent";
import CalendarPageMain from "@/features/calendarPage/components/CalendarPageMain/CalendarPageMain";
import toRecord from "@/features/notion/utils/toRecord";
import getDBRecords from "@/infra/notion/repositories/getDBRecords";

type Props = {
  searchParams?: {
    s?: string | undefined;
    e?: string | undefined;
  };
};

const CalendarPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const today = getCurrent("YYYY-MM-DD");

  const start = searchParams?.s ?? today;
  const end = searchParams?.e ?? today;

  const filter = {
    and: [
      { property: "workTime", date: { on_or_after: start } },
      { property: "workTime", date: { on_or_before: end } },
    ],
  };

  const allRecords = await getDBRecords(filter);
  const events = allRecords.results.map((record) => toRecord(record));

  return <CalendarPageMain events={events} />;
};

export default CalendarPage;
