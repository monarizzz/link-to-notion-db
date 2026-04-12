"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

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
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridDay"
      events={events}
      eventMinHeight={15}
      nowIndicator={true}
      selectable={true}
      select={function (info) {
        alert("selected " + info.startStr + " to " + info.endStr);
      }}
    />
  );
};

export default DayCalendar;
