import calcWorkTime from "@/features/notion/utils/workTime";
import toRecord from "@/features/notion/utils/toRecord";
import getDatabaseRecords from "@/infra/notion/repositories/getDatabaseRecords";
import Link from "next/link";

const Home = async () => {
  const allRecords = await getDatabaseRecords();

  const data = allRecords.results.map((record) => toRecord(record));
  // data.map((record) => console.log(calcWorkTime(record.start, record.end)));

  return (
    <div>
      {data.map((record) => (
        <div key={record.id}>
          <div>作業内容：{record.taskName}</div>
          <div>作業時間：{calcWorkTime(record.start, record.end)}</div>
          <Link href={record.url}>GO NOTION</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
