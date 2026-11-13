"use client";

import { addData } from "@/commons/modal/utils/addData";
import { zodResolver } from "@hookform/resolvers/zod";
import Calendar from "@/commons/calendar/components/Calendar/Calendar";
import { CalendarEvent } from "@/commons/calendar/types/calendarEvent";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DataForm, formSchema } from "@/libs/forms/schema/DataForm";
import type { Label } from "@/infra/api/client";

type Props = {
  labels: Label[];
  events: CalendarEvent[];
  header?: boolean;
  initialDate?: string;
};

const CalendarForm = ({ labels, events, header, initialDate }: Props) => {
  const methods = useForm<DataForm>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onSubmit = async (data: DataForm) => {
    try {
      await addData(data);
      methods.reset();
      /* 登録できたときだけ閉じる。失敗時は入力を残すため開いたままにする */
      setIsOpenModal(false);
    } catch (error) {
      console.error(error); // TODO:errorハンドリングを考える
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Calendar
          labels={labels}
          events={events}
          header={header}
          initialDate={initialDate}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      </form>
    </FormProvider>
  );
};

export default CalendarForm;
