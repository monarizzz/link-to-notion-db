import HomePageMain from "@/features/home/components/HomePageMain/HomePageMain";
import getLabels from "@/infra/api/getLabels";

const Home = async () => {
  const labels = await getLabels();

  return <HomePageMain labels={labels} today={[]} />;
};

export default Home;
