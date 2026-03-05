"use client";

import { Calendar } from "@/libs/shadcn/assets/ui/calendar";

type Props = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
};

const CalendarPicker = ({ date, setDate }: Props) => {
  return (
    <>
      <Calendar
        mode="single"
        className="text-xs w-full"
        selected={date}
        onSelect={setDate}
        classNames={
          {
            // caption_label: "text-sm font-bold",
            // today: "font-bold",
            // day_button: "font-dm-mono",
          }
        }
      />
    </>
  );
};

export default CalendarPicker;
