"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import DailyCalendar from "@/commons/calendar/components/DailyCalendar/DailyCalendar";
import SubmitModal from "@/commons/modal/components/SubmitModal/SubmitModal";
import type { Label, WorkRecord } from "@/infra/client";
import { DATETIME_FORMAT } from "@/libs/dayjs/config";
import { DataForm, formSchema } from "@/libs/zod/workRecordSchema";

import { saveWorkRecord } from "../../utils/saveWorkRecord";

type Props = {
  labels: Label[];
  records: WorkRecord[];
  range: { from: number; to: number };
  /* 作成に成功したあとに呼ぶ。一覧の再取得に使う */
  onCreated: () => void;
};

/* カレンダーで選んだ時間帯を、記録モーダルから登録する */
const CalendarSection = ({ labels, records, range, onCreated }: Props) => {
  /* タイマーの入力と混ざらないよう、フォームを分ける */
  const methods = useForm<DataForm>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  /* モーダルで開始・終了を直しても追従するよう、フォームの値から示す */
  const [start, end] = useWatch({
    control: methods.control,
    name: ["start", "end"],
  });
  const pending =
    isOpenModal && Date.parse(start) < Date.parse(end)
      ? { start: Date.parse(start), end: Date.parse(end) }
      : null;

  const onSelect = ({ start, end }: { start: number; end: number }) => {
    methods.reset({
      start: dayjs(start).format(DATETIME_FORMAT),
      end: dayjs(end).format(DATETIME_FORMAT),
    });
    setIsOpenModal(true);
  };

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

    setIsOpenModal(false);
    onCreated();
  };

  return (
    <>
      <DailyCalendar
        records={records}
        range={range}
        onSelect={onSelect}
        pending={pending}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SubmitModal
            labels={labels}
            isOpenModal={isOpenModal}
            onClose={() => setIsOpenModal(false)}
          />
        </form>
      </FormProvider>
    </>
  );
};

export default CalendarSection;
