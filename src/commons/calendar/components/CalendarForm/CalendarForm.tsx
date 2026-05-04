"use client";

import { addData } from "@/commons/modal/utils/addData";
import { zodResolver } from "@hookform/resolvers/zod";
import Calendar from "@/commons/calendar/components/Calendar/Calendar";
import { NotionEvent } from "@/commons/calendar/type/notionEvent";
import { FormProvider, useForm } from "react-hook-form";
import { DataForm, formSchema } from "@/libs/forms/schema/DataForm";
import { submitProps } from "@/libs/forms/schema/submitProps";

type Props = {
  events: NotionEvent[];
  header?: boolean;
  initialDate?: string;
};

const CalendarForm = ({ events, header, initialDate }: Props) => {
  const methods = useForm<DataForm>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: DataForm) => {
    try {
      await addData(submitProps(data));
      methods.reset();
    } catch (error) {
      console.error(error); // TODO:errorハンドリングを考える
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Calendar events={events} header={header} initialDate={initialDate} />
      </form>
    </FormProvider>
  );
};

export default CalendarForm;
