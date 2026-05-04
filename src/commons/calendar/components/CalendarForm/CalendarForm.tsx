"use client";

import { addData } from "@/commons/modal/utils/addData";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Calendar from "@/commons/calendar/components/Calendar/Calendar";

import { NotionEvent } from "@/commons/calendar/type/notionEvent";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  events: NotionEvent[];
  header?: boolean;
  initialDate?: string;
};

const formSchema = z.object({
  start: z.string().min(1, "開始日時を入力してください"),
  end: z.string().min(1, "終了日時を入力してください"),
  label: z.string().optional(),
  title: z.string().optional(),
});

type DataForm = z.infer<typeof formSchema>;

const CalendarForm = ({ events, header, initialDate }: Props) => {
  const methods = useForm<DataForm>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: DataForm) => {
    try {
      const properties = {
        title: { title: [{ text: { content: data.title ?? "" } }] },
        workTime: {
          date: {
            start: data.start,
            end: data.end,
          },
        },
        ...(data.label && { select: { select: { name: data.label } } }),
      };
      await addData(properties);
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
