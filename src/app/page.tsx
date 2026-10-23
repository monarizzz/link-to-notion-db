import HomePageMain from "@/features/home/components/HomePageMain/HomePageMain";
import toRecord from "@/commons/notion/utils/toRecord";
import toLabels from "@/commons/notion/utils/toLabels";
import getDBRecords from "@/infra/notion/repositories/getDBRecords";
import getDBSchema from "@/infra/notion/repositories/getDBSchema";

const Home = async () => {
  const filter = {
    property: "workTime",
    date: {
      equals: "today",
    },
  };

  const todayRecords = await getDBRecords(filter);
  const today = todayRecords.results.map((record) => toRecord(record));
  const allSchema = await getDBSchema();

  // const todayRecords = await getDBRecords(filter);

  const labels = toLabels(allSchema);

  return <HomePageMain labels={labels} today={today} />;
};

export default Home;
