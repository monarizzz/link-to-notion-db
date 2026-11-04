"use client";

import CalendarForm from "@/commons/calendar/components/CalendarForm/CalendarForm";
import { CalendarEvent } from "@/commons/calendar/types/calendarEvent";
import SideBar from "@/commons/sideBar/components/SideBar";
import { getJstTodayRange } from "@/commons/date/utils/getJstTodayRange";
import type { Label } from "@/infra/api/client";

type Props = {
  labels: Label[];
  events: CalendarEvent[];
};

const CalendarPageMain = ({ labels, events }: Props) => {
  return (
    <div className="flex h-screen flex-row bg-[#1A1A1A]">
      <div className="my-auto shrink-0">
        <SideBar today={[]} range={getJstTodayRange()} />
      </div>
      <div className="mx-16 mt-10">
        <CalendarForm labels={labels} events={events} header />
      </div>
    </div>
  );
};

export default CalendarPageMain;
