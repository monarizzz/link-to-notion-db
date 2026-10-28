"use client";

import CalendarForm from "@/commons/calendar/components/CalendarForm/CalendarForm";
import { NotionEvent } from "@/commons/calendar/type/notionEvent";
import SideBar from "@/commons/sideBar/components/SideBar";
import { Label } from "@/infra/api/types/label";

type Props = {
  labels: Label[];
  events: NotionEvent[];
};

const CalendarPageMain = ({ labels, events }: Props) => {
  return (
    <div className="flex h-screen flex-row bg-[#1A1A1A]">
      <div className="my-auto shrink-0">
        <SideBar today={[]} />
      </div>
      <div className="mx-16 mt-10">
        <CalendarForm labels={labels} events={events} header />
      </div>
    </div>
  );
};

export default CalendarPageMain;
