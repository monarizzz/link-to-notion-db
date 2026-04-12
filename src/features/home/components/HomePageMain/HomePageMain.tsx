"use client";

import { addData } from "@/commons/modal/utils/addData";
import BottomBar from "@/commons/layout/components/BottomBar/BottomBar";
import NowDisplay from "../NowDisplay/NowDisplay";
import WorkCard from "@/commons/workCard/components/WorkCard";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DayCalendar from "@/features/Calendar/components/DayCalendar/DayCalendar";
import { NotionEvent } from "@/features/Calendar/type/notionEvent";

type Props = {
  labels: string[];
  events: NotionEvent[];
};

const formSchema = z.object({
  start: z.string().min(1, "開始日時を入力してください"),
  end: z.string().min(1, "終了日時を入力してください"),
  label: z.string().optional(),
  title: z.string().optional(),
});

type DataForm = z.infer<typeof formSchema>;

const HomePageMain = ({ labels, events }: Props) => {
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
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="relative flex flex-col h-screen w-screen items-center justify-center bg-background">
            <div className="w-100 mx-auto">
              <NowDisplay />
            </div>
            <div className="m-14 min-h-70">
              <WorkCard isInput="timer" labels={labels} />
            </div>
            <div className="absolute bottom-5">
              <BottomBar />
            </div>
          </div>
          <div className="bg-[#1A1A1A]">
            <DayCalendar events={events} />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default HomePageMain;
