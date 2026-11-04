"use client";

import { addData } from "@/commons/modal/utils/addData";
import { zodResolver } from "@hookform/resolvers/zod";
import Calendar from "@/commons/calendar/components/Calendar/Calendar";
import { CalendarEvent } from "@/commons/calendar/types/calendarEvent";
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

  const onSubmit = async (data: DataForm) => {
    try {
      await addData(data);
      methods.reset();
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
        />
      </form>
    </FormProvider>
  );
};

export default CalendarForm;
