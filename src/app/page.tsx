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

  // TODO: Notion SDK が properties をユニオン型で返すため .select に直接アクセスできない。適切な型ガードに置き換える
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Notion SDK returns union type that doesn't expose .select directly
  const labels = allSchema.properties.select.select.options.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (option: any) => option.name,
  );

  return <HomePageMain labels={labels} today={today} />;
};

export default Home;
