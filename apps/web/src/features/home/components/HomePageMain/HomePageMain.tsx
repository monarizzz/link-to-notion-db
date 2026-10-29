"use client";

import { addData } from "@/commons/modal/utils/addData";
import BottomBar from "@/commons/layout/components/BottomBar/BottomBar";
import NowDisplay from "../NowDisplay/NowDisplay";
import WorkCard from "@/commons/workCard/components/WorkCard";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotionEvent } from "@/commons/calendar/type/notionEvent";
import CalendarForm from "@/commons/calendar/components/CalendarForm/CalendarForm";
import SideBar from "@/commons/sideBar/components/SideBar";
import { DataForm, formSchema } from "@/libs/forms/schema/DataForm";
import type { Label } from "@/infra/api/client";

type Props = {
  labels: Label[];
  today: NotionEvent[];
};

const HomePageMain = ({ labels, today }: Props) => {
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
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-background">
            <div className="mx-auto w-100">
              <NowDisplay />
            </div>
            <div className="m-14 min-h-70">
              <WorkCard isInput="timer" labels={labels} />
            </div>
            <div className="absolute bottom-5">{/* <BottomBar /> */}</div>
          </div>
        </form>
      </FormProvider>
      <div className="flex h-screen flex-row bg-[#1A1A1A]">
        <div className="my-auto shrink-0">
          <SideBar today={today} />
        </div>
        <div className="mx-16 mt-10">
          <CalendarForm labels={labels} events={today} />
        </div>
      </div>
    </>
  );
};

export default HomePageMain;
