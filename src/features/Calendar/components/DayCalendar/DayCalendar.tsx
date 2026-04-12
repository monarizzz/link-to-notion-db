"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";
import { useState } from "react";
import SubmitModal from "@/commons/modal/components/SubmitModal/SubmitModal";
import { useFormContext } from "react-hook-form";
import { DateSelectArg } from "@fullcalendar/core/index.js";
import { NotionEvent } from "../../type/notionEvent";

type Props = {
  events?: NotionEvent[];
};

const DayCalendar = ({ events }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { setValue } = useFormContext();

  const addEvent = (info: DateSelectArg) => {
    setIsOpenModal(true);
    setValue("start", info.startStr);
    setValue("end", info.endStr);
  };

  return (
    <div>
      <FullCalendar
        height="100vh"
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        events={events}
        eventMinHeight={15}
        nowIndicator={true}
        selectable={true} // イベント追加用
        select={addEvent}
        locale={jaLocale} // 日本語化
      />
      <SubmitModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </div>
  );
};

export default DayCalendar;
