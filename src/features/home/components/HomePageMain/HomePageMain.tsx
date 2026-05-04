"use client";

import { addData } from "@/commons/modal/utils/addData";
import BottomBar from "@/commons/layout/components/BottomBar/BottomBar";
import NowDisplay from "../NowDisplay/NowDisplay";
import WorkCard from "@/commons/workCard/components/WorkCard";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotionEvent } from "@/commons/calendar/type/notionEvent";
import CalendarForm from "@/commons/calendar/components/CalendarForm/CalendarForm";
import SideBar from "@/commons/sideBar/components/SideBar";
import { DataForm, formSchema } from "@/libs/schema/forms/DataForm";
import { submitProps } from "@/libs/schema/forms/submitProps";

type Props = {
  labels: string[];
  events: NotionEvent[];
};

const HomePageMain = ({ labels, events }: Props) => {
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
        </form>
      </FormProvider>
      <div className="flex flex-row bg-[#1A1A1A]">
        <div className="shrink-0 my-auto">
          <SideBar />
        </div>
        <div className="mx-16 mt-10">
          <CalendarForm events={events} />
        </div>
      </div>
    </>
  );
};

export default HomePageMain;
