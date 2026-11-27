"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import DailyCalendar from "@/commons/calendar/components/DailyCalendar/DailyCalendar";
import CurrentDate from "@/commons/date/components/CurrentDate/CurrentDate";
import CurrentTime from "@/commons/date/components/CurrentTime/CurrentTime";
import SideBar from "@/commons/sideBar/components/SideBar";
import WorkCard from "@/commons/workCard/components/WorkCard";
import type { Label, WorkRecord } from "@/infra/client";
import { DataForm, formSchema } from "@/libs/zod/workRecordSchema";

import { saveWorkRecord } from "../../utils/saveWorkRecord";

type Props = {
  labels: Label[];
  today: WorkRecord[];
  todayRange: { from: number; to: number };
  /* 作成に成功したあとに呼ぶ。一覧の再取得に使う */
  onCreated: () => void;
};

const HomePageMain = ({ labels, today, todayRange, onCreated }: Props) => {
  const methods = useForm<DataForm>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: DataForm) => {
    try {
      await saveWorkRecord(data);
    } catch (error) {
      console.error(error);
      methods.setError("root.save", {
        message: "作業記録を保存できませんでした。もう一度お試しください。",
      });
      return;
    }

    methods.reset();
    onCreated();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex min-h-dvh flex-col items-center justify-center bg-background pb-[10dvh]">
            <CurrentTime />
            <CurrentDate
              color="var(--primary-foreground)"
              fontSizeProps={"14px"}
              letterSpacingProps={"2px"}
              format="YYYY.MM.DD"
            />
            <div className="flex w-full justify-center px-4 py-10 md:p-10">
              <WorkCard labels={labels} />
            </div>
          </div>
        </form>
      </FormProvider>
      <div className="flex flex-col gap-8 bg-[#1A1A1A] py-8 md:h-screen md:flex-row md:gap-0 md:py-0">
        <div className="mr-4 shrink-0 md:my-auto md:mr-0">
          <SideBar today={today} range={todayRange} />
        </div>
        <div className="px-4 md:my-auto md:ml-14 md:max-h-full md:max-w-[851px] md:flex-1 md:overflow-y-auto md:px-0">
          <DailyCalendar records={today} range={todayRange} />
        </div>
      </div>
    </>
  );
};

export default HomePageMain;
