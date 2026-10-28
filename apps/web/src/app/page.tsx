import HomePageMain from "@/features/home/components/HomePageMain/HomePageMain";
import toRecord from "@/commons/notion/utils/toRecord";
import getDBRecords from "@/infra/notion/repositories/getDBRecords";
import getLabels from "@/infra/api/getLabels";

const Home = async () => {
  const filter = {
    property: "workTime",
    date: {
      equals: "today",
    },
  };

  const todayRecords = await getDBRecords(filter);
  const today = todayRecords.results.map((record) => toRecord(record));

  // const todayRecords = await getDBRecords(filter);

  const labels = await getLabels();

  return <HomePageMain labels={labels} today={today} />;
};

export default Home;
