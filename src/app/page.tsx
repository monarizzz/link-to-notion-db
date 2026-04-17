import HomePageMain from "@/features/home/components/HomePageMain/HomePageMain";
import toRecord from "@/features/notion/utils/toRecord";
import getDBRecords from "@/infra/notion/repositories/getDBRecords";
import getDBSchema from "@/infra/notion/repositories/getDBSchema";

// type Props = {
//   searchParams: { [key: string]: string | string[] | undefined };
// };

const Home = async () => {
  // const startDate = props.searchParams.s;
  // const endDate = props.searchParams.e;
  // console.log(startDate, endDate);

  const filter = {
    property: "workTime",
    date: {
      equals: "today",
    },
  };

  const allRecords = await getDBRecords(filter);
  const events = allRecords.results.map((record) => toRecord(record));
  const allSchema = await getDBSchema();

  // const todayRecords = await getDBRecords(filter);

  const labels = allSchema.properties.select.select.options.map(
    (option) => option.name,
  );

  return <HomePageMain labels={labels} events={events} />;
};

export default Home;
