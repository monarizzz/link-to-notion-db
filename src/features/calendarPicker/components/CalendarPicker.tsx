"use client";

import { Calendar } from "@/libs/shadcn/assets/ui/calendar";

type Props = {
  date: Date;
  setDate: (date: Date | undefined) => void;
};

const CalendarPicker = ({ date, setDate }: Props) => {
  return (
    <Calendar
      mode="single"
      className="text-xs"
      selected={date}
      onSelect={setDate}
    />
  );
};

export default CalendarPicker;
