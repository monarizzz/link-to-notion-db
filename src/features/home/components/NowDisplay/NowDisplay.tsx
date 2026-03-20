import CurrentDate from "@/commons/currentDate/components/currentDate";
import CurrentTime from "@/commons/currentTime/components/CurrentTime";

const NowDisplay = () => {
  return (
    <div className="flex gap-2 items-center flex-col">
      <CurrentTime />
      <CurrentDate />
    </div>
  );
};

export default NowDisplay;
