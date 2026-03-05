import CalendarPicker from "@/commons/calendarPicker/components/CalendarPicker";
import DateDisplay from "@/commons/dateDisplay/components/DateDisplay";
import { Separator } from "@/libs/shadcn/assets/ui/separator";

type Props = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
};

const DatePicker = ({ date, setDate }: Props) => {
  return (
    <div className="bg-background-2">
      <div className="mb-3">
        <DateDisplay date={date} />
      </div>
      <Separator className="mb-3.5" />

      <CalendarPicker date={date} setDate={setDate} />
    </div>
  );
};

export default DatePicker;
