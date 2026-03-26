import CurrentDate from "@/commons/date/components/CurrentDate/CurrentDate";
import CurrentTime from "@/commons/date/components/CurrentTime/CurrentTime";

const NowDisplay = () => {
  return (
    <div className="flex gap-2 items-center flex-col">
      <CurrentTime />
      <CurrentDate />
    </div>
  );
};

export default NowDisplay;
