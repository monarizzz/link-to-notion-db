"use client";

import CalendarForm from "@/commons/calendar/components/CalendarForm/CalendarForm";
import { NotionEvent } from "@/commons/calendar/type/notionEvent";
import SideBar from "@/commons/sideBar/components/SideBar";

type Props = {
  events: NotionEvent[];
};

const CalendarPageMain = ({ events }: Props) => {
  return (
    <div className="flex h-screen flex-row bg-[#1A1A1A]">
      <div className="my-auto shrink-0">
        <SideBar today={[]} />
      </div>
      <div className="mx-16 mt-10">
        <CalendarForm events={events} header />
      </div>
    </div>
  );
};

export default CalendarPageMain;
