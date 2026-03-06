import CalendarPicker from "@/features/calendarPicker/components/CalendarPicker";
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
      <div className="mb-5">
        <DateDisplay date={date} />
        <div className="my-2">
          <DateLabel date={date} />
        </div>
      </div>
      <Separator className="mb-3.5" />
      <CalendarPicker date={date} setDate={setDate} />
    </div>
  );
};

export default DateGroup;
