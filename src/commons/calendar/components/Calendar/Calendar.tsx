"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";
import { useState } from "react";
import SubmitModal from "@/commons/modal/components/SubmitModal/SubmitModal";
import { useFormContext } from "react-hook-form";
import { DateSelectArg, DatesSetArg } from "@fullcalendar/core/index.js";
import { NotionEvent } from "../../type/notionEvent";
import { useRouter } from "next/navigation";

type Props = {
  events?: NotionEvent[];
};

const Calendar = ({ events }: Props) => {
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { setValue } = useFormContext();

  const addEvent = (info: DateSelectArg) => {
    setIsOpenModal(true);
    setValue("start", info.startStr);
    setValue("end", info.endStr);
  };

  const handleDatesSet = (dateInfo: DatesSetArg) => {
    const params = new URLSearchParams({
      s: dateInfo.startStr,
      e: dateInfo.endStr,
    });
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="text-[11px]">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        datesSet={handleDatesSet}
        events={events}
        eventMinHeight={15}
        nowIndicator={true}
        selectable={true} // イベント追加用
        select={addEvent}
        locale={jaLocale} // 日本語化
        headerToolbar={{
          left: "",
          center: "",
          right: "dayGridMonth,timeGridWeek,timeGridDay,prev,today,next",
        }}
        contentHeight="auto"
        slotDuration="00:30:00"
        snapDuration="00:10:00"
        slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
      />
      <SubmitModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </div>
  );
};

export default Calendar;
