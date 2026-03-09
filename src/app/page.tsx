import toRecord from "@/features/notion/utils/toRecord";
import getDBRecords from "@/infra/notion/repositories/getDBRecords";
import HomePageMain from "@/features/home/components/HomePageMain/HomePageMain";
import getDBSchema from "@/infra/notion/repositories/getDBSchema";

const Home = async () => {
  const allRecords = await getDBRecords();
  const data = allRecords.results.map((record) => toRecord(record));
  const allSchema = await getDBSchema();

  const labels = allSchema.properties.select.select.options.map(
    (option) => option.name,
  );

  // allRecords.results.map((record) => {
  //   console.log(record.properties);
  // });

  return <HomePageMain labels={labels} records={data} />;
};

export default Home;
