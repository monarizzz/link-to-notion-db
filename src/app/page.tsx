import HomePageMain from "@/features/home/components/HomePageMain/HomePageMain";
import toRecord from "@/commons/notion/utils/toRecord";
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

  const labels = allSchema.properties.select.select.options.map(
    (option) => option.name,
  );

  return <HomePageMain labels={labels} today={today} />;
};

export default Home;
