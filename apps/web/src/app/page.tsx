import HomePageMain from "@/features/home/components/HomePageMain/HomePageMain";
import { toCalendarEvent } from "@/commons/calendar/utils/toCalendarEvent";
import { getJstTodayRange } from "@/commons/date/utils/getJstTodayRange";
import getLabels from "@/infra/api/getLabels";
import getWorkRecords from "@/infra/api/getWorkRecords";

const Home = async () => {
  const { from, to } = getJstTodayRange();
  const [labels, workRecords] = await Promise.all([
    getLabels(),
    getWorkRecords(from, to),
  ]);

  return (
    <HomePageMain labels={labels} today={workRecords.map(toCalendarEvent)} />
  );
};

export default Home;
