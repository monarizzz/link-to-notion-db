import toRecord from "@/features/notion/utils/toRecord";
import getDBRecords from "@/infra/notion/repositories/getDBRecords";
import WorkLogDateGroup from "@/features/home/WorkLogDateGroup/components/WorkLogDateGroup";

const Home = async () => {
  const allRecords = await getDBRecords();
  const data = allRecords.results.map((record) => toRecord(record));

  return (
    <div>
      <WorkLogDateGroup records={data} />
    </div>
  );
};

export default Home;
