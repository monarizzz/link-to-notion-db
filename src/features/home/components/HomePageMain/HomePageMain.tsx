import BottomBar from "@/commons/layout/components/BottomBar/BottomBar";
import NowDisplay from "../NowDisplay/NowDisplay";
import TaskCard from "@/commons/taskCard/components/TaskCard";

type Props = {
  labels: string[];
};
// TODO:仮置き
const time = "00:12:34";
const work = "デザイン修正";

const HomePageMain = ({ labels }: Props) => {
  return (
    <>
      <div className="relative flex flex-col h-screen w-screen items-center justify-center bg-[#2C2C2C]">
        <NowDisplay />
        <div className="m-14">
          <TaskCard isInput="input" labels={labels} work={work} time={time} />
        </div>
        <div className="absolute bottom-5">
          <BottomBar />
        </div>
      </div>
    </>
  );
};

export default HomePageMain;
