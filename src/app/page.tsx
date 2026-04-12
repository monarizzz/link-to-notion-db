import HomePageMain from "@/features/home/components/HomePageMain/HomePageMain";
import toRecord from "@/features/notion/utils/toRecord";
import getDBRecords from "@/infra/notion/repositories/getDBRecords";
import getDBSchema from "@/infra/notion/repositories/getDBSchema";

const Home = async () => {
  const allRecords = await getDBRecords();
  const events = allRecords.results.map((record) => toRecord(record));
  const allSchema = await getDBSchema();

  const labels = allSchema.properties.select.select.options.map(
    (option) => option.name,
  );

  return <HomePageMain labels={labels} events={events} />;
};

export default Home;
