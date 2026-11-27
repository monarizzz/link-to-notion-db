"use client";

import WorkCard from "@/commons/workCard/components/WorkCard";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SideBar from "@/commons/sideBar/components/SideBar";
import { DataForm, formSchema } from "@/libs/zod/workRecordSchema";
import type { Label, WorkRecord } from "@/infra/client";
import CurrentDate from "@/commons/date/components/CurrentDate/CurrentDate";
import CurrentTime from "@/commons/date/components/CurrentTime/CurrentTime";
import postWorkRecord from "@/infra/api/postWorkRecord";

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
      await postWorkRecord({
        title: data.title,
        started_at: data.start,
        ended_at: data.end,
        label_ids: data.label ? [data.label] : [],
      });
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
            <div className="p-10">
              <WorkCard labels={labels} />
            </div>
          </div>
        </form>
      </FormProvider>
      <div className="flex h-screen flex-row bg-[#1A1A1A]">
        <div className="my-auto shrink-0">
          <SideBar today={today} range={todayRange} />
        </div>
      </div>
    </>
  );
};

export default HomePageMain;
