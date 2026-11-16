import HomePageMain from "@/features/home/components/HomePageMain/HomePageMain";
import { getJstTodayRange } from "@/commons/date/utils/getJstTodayRange";
import getLabels from "@/infra/api/getLabels";
import getWorkRecords from "@/infra/api/getWorkRecords";

/* 今日の作業記録をリクエストごとに取得する。事前レンダリングだとビルド時のデータで固定され、ビルド中に API も要る */
export const dynamic = "force-dynamic";

const Home = async () => {
  const todayRange = getJstTodayRange();
  const [labels, workRecords] = await Promise.all([
    getLabels(),
    getWorkRecords(todayRange.from, todayRange.to),
  ]);

  return (
    <HomePageMain labels={labels} today={workRecords} todayRange={todayRange} />
  );
};

export default Home;
