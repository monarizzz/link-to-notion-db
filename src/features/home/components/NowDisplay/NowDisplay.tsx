import CurrentDate from "@/commons/currentDate/components/CurrentDate";
import CurrentTime from "@/commons/currentTime/components/CurrentTime";

type Props = { isTimer: boolean };

const NowDisplay = ({ isTimer }: Props) => {
  return (
    <div className="flex gap-2 items-center flex-col">
      <CurrentTime isTimer={isTimer} />
      <CurrentDate />
    </div>
  );
};

export default NowDisplay;
