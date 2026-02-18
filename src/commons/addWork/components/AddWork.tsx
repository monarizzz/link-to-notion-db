"use client";

import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import styles from "./AddWork.module.css";
import { addWorkAction } from "@/commons/addWork/entities/addWorkAction";

dayjs.extend(utc);
dayjs.extend(timezone);

type From = {
  detail: string;
  select: string;
  date: string;
  start: string;
  end: string;
};
const AddPage = ({ selects }) => {
  const defaultDate = dayjs().tz("Asia/Tokyo").format("YYYY-MM-DD");
  const defaultTime = dayjs().tz("Asia/Tokyo").format("HH:mm");
  const defaultWorkTime = dayjs()
    .tz("Asia/Tokyo")
    .add(20, "minute")
    .format("HH:mm");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<From>({
    defaultValues: {
      detail: "",
      select: "",
      date: defaultDate,
      start: defaultTime,
      end: defaultWorkTime,
    },
  });
  const onSubmit = (data: From) => {
    const properties = {
      taskName: { title: [{ text: { content: data.select } }] },
      workTime: {
        date: {
          start: `${data.date}T${data.start}:00+09:00`,
          end: `${data.date}T${data.end}:00+09:00`,
        },
      },
      select: { select: { name: data.select } },
      detail: { rich_text: [{ text: { content: data.detail } }] },
    };
    addWorkAction(properties);
  };

  return (
    <div className={styles.root}>
      <p className={styles.detail}>作業内容を記録</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          type="text"
          {...register("detail", { required: true })}
          placeholder="作業内容を入力..."
        />
        {errors.detail && "作業内容を入力してください"}
        <div className={styles.group}>
          <select
            className={styles.input}
            {...register("select", { required: true })}
          >
            {errors.select && "作業の種類を選択してください"}

            {selects.map((select) => (
              <option key={select} value={select}>
                {select}
              </option>
            ))}
          </select>
          <input
            className={styles.input}
            type="date"
            {...register("date", { required: true })}
          />
          {errors.start && "作業日を選択してください"}
          <input
            className={styles.input}
            type="time"
            {...register("start", { required: true })}
          />
          {errors.start && "開始時間を選択してください"}
          <input
            className={styles.input}
            type="time"
            {...register("end", { required: true })}
          />
          {errors.start && "終了時間を選択してください"}
        </div>
        <input type="submit" value="記録を追加" className={styles.btn} />
      </form>
    </div>
  );
};
export default AddPage;
