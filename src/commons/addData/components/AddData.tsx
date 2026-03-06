"use client";

import { addDataAction } from "@/commons/addData/entities/addDataAction";
import DateGroup from "@/features/addData/components/DateGroup/DateGroup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/libs/shadcn/assets/ui/field";
import { Input } from "@/libs/shadcn/assets/ui/input";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import TaskBtn from "@/features/other/taskBtn/components/TaskBtn";
import { Separator } from "@/libs/shadcn/assets/ui/separator";
import Image from "next/image";

dayjs.extend(utc);
dayjs.extend(timezone);

type From = {
  title: string;
  select: string;
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
    setValue,
    formState: { errors },
  } = useForm<From>({
    defaultValues: {
      title: "",
      select: labels[0],
      date: defaultDateFormat,
      start: defaultTime,
      end: defaultWorkTime,
    },
  });

  const onSubmit = (data: From) => {
    const properties = {
      title: { title: [{ text: { content: data.select } }] },
      workTime: {
        date: {
          start: `${data.date}T${data.start}:00+09:00`,
          end: `${data.date}T${data.end}:00+09:00`,
        },
      },
      select: { select: { name: data.select } },
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

  const selectedValue = watch("select");

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
      <Separator />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <FieldGroup className="py-6 px-7">
            <Field>
              <FieldLabel htmlFor="title">作業内容</FieldLabel>
              <Input
                id="title"
                {...register("title", { required: true })}
                placeholder="何をしていましたか？"
                className="bg-background-2 text-sm"
              />
              {errors.title && (
                <FieldError>作業内容を入力してください</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="label">種類</FieldLabel>
              <div
                {...register("select", { required: true })}
                className="gap-x-1.5 flex"
              >
                {labels.map((label) => (
                  <TaskBtn
                    key={label}
                    label={label}
                    setLabel={label === selectedValue}
                    onClick={() => setValue("select", label)}
                  />
                ))}
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="time">作業時間</FieldLabel>
              <div className="bg-background-2 rounded-2xl  border-[1.5px]">
                <div className="flex justify-between">
                  <div className="flex gap-2.5 px-3.5 items-center">
                    <Image src="time.svg" width={10} height={10} alt="time" />
                    <span className="text-2xs font-medium uppercase text-subtle-foreground pr-3.5">
                      開始
                    </span>
                    <div className="self-stretch h-auto py-4 ">
                      <Separator orientation="vertical" />
                    </div>
                  </div>
                  <input
                    type="time"
                    id="start"
                    {...register("start", { required: true })}
                    className="p-3.5 font-dm-mono text-[20px] text-foreground cursor-pointer flex-1"
                  />
                </div>
                <Separator />
                <div className="flex justify-between">
                  <div className="flex gap-2.5 px-3.5 items-center">
                    <Image src="time.svg" width={10} height={10} alt="time" />
                    <span className="text-2xs font-medium uppercase text-subtle-foreground pr-3.5">
                      終了
                    </span>
                    <div className="self-stretch h-auto py-4">
                      <Separator orientation="vertical" />
                    </div>
                  </div>
                  <input
                    type="time"
                    id="end"
                    {...register("end", { required: true })}
                    className="p-3.5 font-dm-mono text-[20px] text-foreground cursor-pointer flex-1"
                  />
                </div>
                <Separator />
                <div className="text-2xs font-medium uppercase text-subtle-foreground py-2.5 px-3.5">
                  合計
                </div>
              </div>
            </Field>
          </FieldGroup>
          <div className="self-stretch h-auto">
            <Separator orientation="vertical" />
          </div>
          <div className="bg-background-2 w-[320px]">
            <Field className="  pt-5 px-5 pb-7">
              <FieldLabel htmlFor="date">日付</FieldLabel>
              <DateGroup date={date} setDate={handleSetDate} />
            </Field>
          </div>
        </div>
        <Separator />
        <div className="flex w-full px-7 py-4.5 gap-2.5 justify-between">
          <input
            type="submit"
            value="記録を追加"
            className="rounded-lg py-2.5 w-full px-5 bg-primary text-background text-[14px] font-medium cursor-pointer"
          />
          <input
            type="reset"
            value="キャンセル"
            className="rounded-lg py-2.5 px-5 border border-border text-foreground text-[14px] font-medium cursor-pointer max-w-30"
          />
        </div>
      </form>
    </div>
  );
};

export default AddData;
