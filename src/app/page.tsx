import toRecord from "@/features/notion/utils/toRecord";
import getDBRecords from "@/infra/notion/repositories/getDBRecords";
import HomePageMain from "@/features/home/homePageMain/components/HomePageMain";

const Home = async () => {
  const allRecords = await getDBRecords();
  const data = allRecords.results.map((record) => toRecord(record));
  return (
    <>
      <HomePageMain records={data} />
    </>
  );
};

export default Home;
