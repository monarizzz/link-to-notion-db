"use client";

import { addDataAction } from "@/commons/addData/entities/addDataAction";
import { diffTime } from "@/commons/addData/entities/diffTime";
import DateGroup from "@/features/addData/components/DateGroup/DateGroup";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import TaskBtn from "@/features/addData/components/TaskBtn/TaskBtn";

import Image from "next/image";
import TimeField from "@/features/addData/components/TimeField/TimeField";
import Line from "@/commons/layout/components/Line/Line";
import EditContainer from "@/features/addData/components/EditContainer/EditContainer";
import EditBtn from "@/features/addData/components/EditBtn/EditBtn";
import { useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

type Form = {
  title: string;
  label: string;
  sDate: string;
  eDate: string;
  sTime: string;
  eTime: string;
};

type Props = {
  labels: string[];
};

const timeTextCn =
  "p-3.5 font-dm-mono text-[20px] text-foreground cursor-pointer flex-1";

/* 現状TimeZoneは日本のみを想定 */
const TZ_OFFSET_JP = "09:00";

const AddData = ({ labels }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const defaultDate = dayjs().tz("Asia/Tokyo");
  const defaultDateFormat = defaultDate.format("YYYY-MM-DD");
  const defaultTime = defaultDate.format("HH:mm");
  const defaultWorkTime = defaultDate.add(20, "minute").format("HH:mm");

  /* バリデーション */
  const formSchema = z.object({
    title: z.string(),
    label: z.string(),
    sDate: z,
    eDate: z,
    sTime: z,
    eTime: z,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      label: labels[0],
      sDate: defaultDateFormat,
      eDate: defaultDateFormat,
      sTime: defaultTime,
      eTime: defaultWorkTime,
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: Form) => {
    try {
      const properties = {
        title: { title: [{ text: { content: data.title } }] },
        workTime: {
          date: {
            start: `${data.sDate}T${data.sTime}:00+${TZ_OFFSET_JP}`,
            end: `${data.eDate}T${data.eTime}:00+${TZ_OFFSET_JP}`,
          },
        },
        select: { select: { name: data.label } },
      };
      await addDataAction(properties);
      reset();
    } catch (error) {
      console.error(error); // TODO:errorハンドリングを考える
    }
  };

  const [sTimeValue, eTimeValue, sDateValue, eDateValue] = useWatch({
    control,
    name: ["sTime", "eTime", "sDate", "eDate"],
  });
  const labelValue = useWatch({ control, name: "label" });

  const workingTime = diffTime(
    `${sDateValue}T${sTimeValue}`,
    `${eDateValue}T${eTimeValue}`,
  );

  const handleSetDate = (date: Date | undefined) => {
    if (date)
      setValue("sDate", dayjs(date).tz("Asia/Tokyo").format("YYYY-MM-DD"));
  };

  return (
    <div className="w-full bg-background rounded-4xl border-[1.5px]">
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
              <div className="gap-x-1.5 flex overflow-hidden mask-[linear-gradient(to_right,black_80%,transparent)]">
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
              <div className="bg-background-2 rounded-2xl  border-[1.5px] overflow-hidden">
                <div className="flex justify-between ">
                  <TimeField text={"開始"} />
                  <input
                    type="time"
                    id="sTime"
                    {...register("sTime", { required: true })}
                    className={timeTextCn}
                  />
                </div>
                <Line />
                <div className="flex justify-between">
                  <TimeField text={"終了"} />
                  <input
                    type="time"
                    id="eTime"
                    {...register("eTime", { required: true })}
                    className={timeTextCn}
                  />
                </div>
                <Line dashed />
                <div className="flex justify-between items-center px-6 py-2.25">
                  <div className="text-2xs font-medium text-subtle-foreground">
                    合計
                  </div>
                  <div className="flex gap-5 items-center">
                    <span className="font-dm-mono text-sm text-muted-foreground font-medium">
                      {workingTime}
                    </span>
                    <EditBtn onClick={() => setIsEditing((prev) => !prev)} />
                  </div>
                </div>
                {isEditing && (
                  <div>
                    <Line dashed />
                    <EditContainer hours={2} minutes={0} />
                  </div>
                )}
              </div>
            </Field>
          </FieldGroup>
          <Line vertical />
          <div className="bg-background-2 w-[320px] min-h-113.25">
            <Field className="pt-6 px-5">
              <FieldLabel htmlFor="date">日付</FieldLabel>
              <DateGroup date={sDateValue} setDate={handleSetDate} />
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
