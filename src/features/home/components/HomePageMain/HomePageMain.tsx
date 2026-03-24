"use client";

import { addDataAction } from "@/commons/addData/entities/addDataAction";

import BottomBar from "@/commons/layout/components/BottomBar/BottomBar";
import NowDisplay from "../NowDisplay/NowDisplay";
import TaskCard from "@/commons/taskCard/components/TaskCard";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  labels: string[];
};

const formSchema = z.object({
  start: z.string().min(1, "開始日時を入力してください"),
  end: z.string().min(1, "終了日時を入力してください"),
  label: z.string().optional(),
  title: z.string().optional(),
});

type DataForm = z.infer<typeof formSchema>;

const HomePageMain = ({ labels }: Props) => {
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
      await addDataAction(properties);
      methods.reset();
    } catch (error) {
      console.error(error); // TODO:errorハンドリングを考える
    }
  };

  return (
    <>
      <div className="relative flex flex-col h-screen w-screen items-center justify-center bg-[#2C2C2C]">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="w-100 mx-auto">
              <NowDisplay />
            </div>
            <div className="m-14 min-h-70">
              <TaskCard isInput="timer" labels={labels} />
            </div>
          </form>
        </FormProvider>
        <div className="absolute bottom-5">
          <BottomBar />
        </div>
      </div>
    </>
  );
};

export default HomePageMain;
