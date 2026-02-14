import calcWorkTime from "@/features/notion/utils/workTime";
import toRecord from "@/features/notion/utils/toRecord";
import getDBRecords from "@/infra/notion/repositories/getDBRecords";
import DeleteBtn from "@/commons/deleteBtn/components/deleteBtn";
import Link from "next/link";

const Home = async () => {
  const allRecords = await getDBRecords();

  const data = allRecords.results.map((record) => toRecord(record));
  // data.map((record) => console.log(calcWorkTime(record.start, record.end)));

  return (
    <div>
      {data.map((record) => (
        <div key={record.id}>
          <div>作業内容：{record.taskName}</div>
          <div>作業時間：{calcWorkTime(record.start, record.end)}</div>
          <div>id:{record.id}</div>
          <Link href={record.url}>GO NOTION</Link>
          <DeleteBtn size={24} pageId={record.id} />
        </div>
      ))}
    </div>
  );
};

export default Home;
