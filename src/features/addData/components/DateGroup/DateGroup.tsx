import CalendarPicker from "@/features/addData/components/CalendarPicker/CalendarPicker";
import DateDisplay from "@/features/addData/components/DateDisplay/DateDisplay";
import { Separator } from "@/libs/shadcn/assets/ui/separator";
import dayjs from "dayjs";
import DateLabel from "../DateLabel/DateLabel";

type Props = {
  date: string;
  setDate: (date: Date | undefined) => void;
};

const DateGroup = ({ date, setDate }: Props) => {
  const dateObj = dayjs(date).toDate();
  return (
    <div className="w-fit!">
      <div className="mb-3">
        <div className="ml-1">
          <DateDisplay date={dateObj} />
        </div>
        <div className="my-1.5 ml-0.5">
          <DateLabel date={dateObj} />
        </div>
      </div>
      <Separator className="mb-2" />
      <CalendarPicker date={dateObj} setDate={setDate} />
    </div>
  );
};

export default DateGroup;
