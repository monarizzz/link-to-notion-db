import getDatabaseRecords from "@/infra/notion/repositories/getDatabaseRecords";

const Home = async () => {
  const data = await getDatabaseRecords();

  console.log(data);
  return (
    <div>
      {data.results.map((record) => (
        <div key={record.id}>{record.object}</div>
      ))}
    </div>
  );
};

export default Home;
