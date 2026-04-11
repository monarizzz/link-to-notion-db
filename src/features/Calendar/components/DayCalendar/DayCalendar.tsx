"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

type event = {
  title: string;
  start: string;
  end: string;
};

type Props = {
  events?: event[];
};

const DayCalendar = ({ events }: Props) => {
  return (
    <FullCalendar
      height="100vh"
      plugins={[timeGridPlugin]}
      initialView="timeGridDay"
      events={events}
      eventMinHeight={15}
      nowIndicator={true}
    />
  );
};

export default DayCalendar;
