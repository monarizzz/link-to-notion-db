import CurrentDate from "@/commons/date/currentDate/components/CurrentDate";
import CurrentTime from "@/commons/date/currentTime/components/CurrentTime";

const NowDisplay = () => {
  return (
    <div className="flex gap-2 items-center flex-col">
      <CurrentTime />
      <CurrentDate />
    </div>
  );
};

export default NowDisplay;
