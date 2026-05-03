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

  const filter =
    searchParams?.s && searchParams?.e
      ? {
          property: "workTime",
          date: {
            on_or_after: searchParams.s,
            on_or_before: searchParams.e,
          },
        }
      : undefined;

  const allRecords = await getDBRecords(filter);
  const events = allRecords.results.map((record) => toRecord(record));

  return <CalendarPageMain events={events} />;
};

export default CalendarPage;
