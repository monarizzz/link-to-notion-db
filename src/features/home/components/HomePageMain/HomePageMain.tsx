"use client";

import BottomBar from "@/commons/layout/components/BottomBar/BottomBar";
import NowDisplay from "../NowDisplay/NowDisplay";
import TaskCard from "@/commons/taskCard/components/TaskCard";
import { SubmitHandler, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  labels: string[];
};

const formSchema = z.object({
  start: z.string().min(1, "開始日時を入力してください"),
  label: z.string().optional(),
});

type UserData = z.infer<typeof formSchema>;

// TODO:仮置き（タスク管理用DBから取得する予定）
const time = "00:12:34";

const HomePageMain = ({ labels }: Props) => {
  const methods = useForm<UserData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<UserData> = (data) => {
    console.log(data);
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
              <TaskCard isInput="input" labels={labels} time={time} />
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
