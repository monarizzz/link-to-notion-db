import CalendarPageMain from "@/features/calendarPage/components/CalendarPageMain/CalendarPageMain";
import getLabels from "@/infra/api/getLabels";

const CalendarPage = async () => {
  const labels = await getLabels();

  return <CalendarPageMain labels={labels} events={[]} />;
};

export default CalendarPage;
