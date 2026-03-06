"use client";

import { addDataAction } from "@/commons/addData/entities/addDataAction";
import { diffTime } from "@/commons/addData/entities/diffTime";
import DateGroup from "@/features/addData/components/DateGroup/DateGroup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/libs/shadcn/assets/ui/field";
import { Input } from "@/libs/shadcn/assets/ui/input";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import TaskBtn from "@/features/other/taskBtn/components/TaskBtn";

import Image from "next/image";
import TimeField from "@/features/addData/components/TimeField/TimeField";
import Line from "@/commons/layout/line/components/Line";

dayjs.extend(utc);
dayjs.extend(timezone);

type Form = {
  title: string;
  label: string;
  date: string;
  start: string;
  end: string;
};

type Props = {
  labels: string[];
};

const AddData = ({ labels }: Props) => {
  const defaultDate = dayjs().tz("Asia/Tokyo");
  const defaultDateFormat = defaultDate.format("YYYY-MM-DD");
  const defaultTime = dayjs().tz("Asia/Tokyo").format("HH:mm");
  const defaultWorkTime = dayjs()
    .tz("Asia/Tokyo")
    .add(20, "minute")
    .format("HH:mm");

  const [date, setDate] = useState<Date>(defaultDate.toDate());

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      title: "",
      label: labels[0],
      date: defaultDateFormat,
      start: defaultTime,
      end: defaultWorkTime,
    },
  });

  const timeText =
    "p-3.5 font-dm-mono text-[20px] text-foreground cursor-pointer flex-1";

  const onSubmit = (data: Form) => {
    const properties = {
      title: { title: [{ text: { content: data.title } }] },
      workTime: {
        date: {
          start: `${data.date}T${data.start}:00+09:00`,
          end: `${data.date}T${data.end}:00+09:00`,
        },
      },
      label: { select: { name: data.label } },
      // detail: { rich_text: [{ text: { content: data.detail } }] },
    };
    // addDataAction(properties);
    console.log(properties);
  };
  const handleSetDate = (d: Date | undefined) => {
    if (!d) return;
    setDate(d);
    setValue("date", dayjs(d).tz("Asia/Tokyo").format("YYYY-MM-DD"));
  };

  const labelValue = watch("label");
  const startValue = watch("start");
  const endValue = watch("end");
  const workingTime = diffTime(startValue, endValue);

  return (
    <div className="w-full max-w-225 bg-background rounded-4xl border-[1.5px]">
      <div className="items-center py-6 px-7 flex gap-2.5">
        <div className="bg-primary rounded-lg p-2">
          <Image src="/document.svg" width={15} height={15} alt="document" />
        </div>
        <span className="font-semibold text-base text-foreground">
          作業を記録
        </span>
      </div>
      <Line />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <FieldGroup className="py-6 px-7">
            <Field>
              <FieldLabel htmlFor="title">作業内容</FieldLabel>
              <Input
                id="title"
                {...register("title", { required: true })}
                placeholder="何をしていましたか？"
                className="bg-background-2 text-sm py-5 px-3.25"
              />
              {errors.title && (
                <FieldError>作業内容を入力してください</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="label">種類</FieldLabel>
              <div className="gap-x-1.5 flex">
                <input
                  type="hidden"
                  {...register("label", { required: true })}
                />
                {labels.map((label) => (
                  <TaskBtn
                    key={label}
                    label={label}
                    setLabel={label === labelValue}
                    onClick={() => setValue("label", label)}
                  />
                ))}
                {errors.label && (
                  <FieldError>種類を選択してください</FieldError>
                )}
              </div>
            </Field>
            <Field className="my-auto">
              <FieldLabel htmlFor="time">作業時間</FieldLabel>
              <div className="bg-background-2 rounded-2xl  border-[1.5px]">
                <div className="flex justify-between">
                  <TimeField text={"開始"} />
                  <input
                    type="time"
                    id="start"
                    {...register("start", { required: true })}
                    className={timeText}
                  />
                </div>
                <Line />
                <div className="flex justify-between">
                  <TimeField text={"終了"} />
                  <input
                    type="time"
                    id="end"
                    {...register("end", { required: true })}
                    className={timeText}
                  />
                </div>
                <Line />
                <div className="flex justify-between items-center px-3.5 py-2.25">
                  <div className="text-2xs font-medium uppercase text-subtle-foreground">
                    合計
                  </div>
                  {/* <button> */}
                  <div className="flex gap-5 items-center">
                    <span className="font-dm-mono text-sm text-muted-foreground font-medium">
                      {workingTime}
                    </span>
                    <Image
                      src="/pen.svg"
                      alt="pen"
                      width={10}
                      height={10}
                      className="pb-0.5"
                    />
                    {/* </button> */}
                  </div>
                </div>
              </div>
            </Field>
          </FieldGroup>
          <Line vertical />
          <div className="bg-background-2 w-[320px] min-h-113.25">
            <Field className="pt-6 px-5">
              <FieldLabel htmlFor="date">日付</FieldLabel>
              <DateGroup date={date} setDate={handleSetDate} />
            </Field>
          </div>
        </div>
        <Line />
        <div className="flex w-full px-7 py-4.5 gap-2.5 justify-between">
          <input
            type="submit"
            value="記録を追加"
            className="rounded-lg py-2.5 w-full px-5 bg-primary text-background text-[14px] font-medium cursor-pointer"
          />
          <input
            type="button"
            onClick={() => reset()}
            value="キャンセル"
            className="rounded-lg py-2.5 px-5 border border-border text-foreground text-[14px] font-medium cursor-pointer max-w-30"
          />
        </div>
      </form>
    </div>
  );
};

export default AddData;
