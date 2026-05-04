"use client";

import Calendar from "@/commons/calendar/components/Calendar/Calendar";
import { NotionEvent } from "@/commons/calendar/type/notionEvent";
import { addData } from "@/commons/modal/utils/addData";
import SideBar from "@/features/home/components/SideBar/SideBar";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  events: NotionEvent[];
};

const formSchema = z.object({
  start: z.string().min(1, "開始日時を入力してください"),
  end: z.string().min(1, "終了日時を入力してください"),
  label: z.string().optional(),
  title: z.string().optional(),
});
type DataForm = z.infer<typeof formSchema>;

const CalendarPageMain = ({ events }: Props) => {
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
        <div className="flex flex-row bg-[#1A1A1A] h-screen">
          <div className="shrink-0 my-auto">
            <SideBar today={null} />
          </div>
          <div className="mx-16 mt-10">
            <Calendar events={events} header />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CalendarPageMain;
