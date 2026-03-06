import CalendarPicker from "@/features/addData/components/CalendarPicker/CalendarPicker";
import DateDisplay from "@/features/addData/components/DateDisplay/DateDisplay";
import { Separator } from "@/libs/shadcn/assets/ui/separator";
import DateLabel from "../DateLabel/DateLabel";

type Props = {
  date: Date;
  setDate: (date: Date | undefined) => void;
};

const DateGroup = ({ date, setDate }: Props) => {
  return (
    <div className="w-fit!">
      <div className="mb-3">
        <div className="ml-1">
          <DateDisplay date={date} />
        </div>
        <div className="my-1.5 ml-0.5">
          <DateLabel date={date} />
        </div>
      </div>
      <Separator className="mb-2" />
      <CalendarPicker date={date} setDate={setDate} />
    </div>
  );
};

export default DateGroup;
