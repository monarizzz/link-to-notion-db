"use client";

import Line from "@/commons/layout/components/Line/Line";
import { Control, useWatch } from "react-hook-form";
import Image from "next/image";
import dayjs from "dayjs";
import "@/libs/dayjs/config";
import { Input } from "@/libs/shadcn/assets/ui/input";

type Props = {
  control: Control;
};

const CheckoutModal = ({ control }: Props) => {
  const [start, end, label, detail] = useWatch({
    control,
    name: ["start", "end", "label", "detail"],
  });

  const dur = dayjs.duration(dayjs(end).diff(dayjs(start)));
  const total = `${Math.floor(dur.asHours())}時間${dur.minutes()}分`;
  return (
    <div className="bg-[#2C2C2E] rounded-4xl overflow-hidden">
      <div className="flex flex-col p-6 gap-2.5">
        <span className="text-[11px] text-[#8A8A8E] font-semibold">
          作業時間
        </span>
        <span className="text-[32px] text-[#F5F5F5] font-bold">{total}</span>
      </div>
      <Line />
      <div className="py-5 px-6 flex flex-col gap-4">
        <span className="text-[#8A8A8E] text-[12px] font-semibold">
          何をしましたか？
        </span>
        <Input className="py-3 px-3.5" />
        <div>
          <div className="flex justify-between p-2.5 text-[14px]">
            <div className="text-[#8A8A8E]">分類</div>
            <div className="flex gap-2">
              <span className="text-[#F5F5F5]">{label}</span>
              <Image src="/pen.svg" alt="pen" height={12} width={12} />
            </div>
          </div>
          <div className="flex justify-between p-2.5 text-[14px]">
            <div className="text-[#8A8A8E]">開始時間</div>
            <div className="flex gap-2">
              <span className="text-[#F5F5F5]">
                {dayjs(start).format("MM/DD HH:MM")}
              </span>
              <Image src="/pen.svg" alt="pen" height={12} width={12} />
            </div>
          </div>
          <div className="flex justify-between p-2.5 text-[14px]">
            <div className="text-[#8A8A8E] ">終了時間</div>
            <div className="flex gap-2">
              <span className="text-[#F5F5F5]">
                {dayjs(end).format("MM/DD HH:MM")}
              </span>
              <Image src="/pen.svg" alt="pen" height={12} width={12} />
            </div>
          </div>
        </div>
      </div>
      <Line />
      <div className="pt-4 px-5 pb-5 flex gap-3 justify-between">
        <div className="bg-[#c2ef53] rounded-xl py-3.5 flex w-full">
          <div className="m-auto flex gap-3">
            <Image src="/public/plain.svg" height={18} width={18} alt="plain" />
            <input
              type="submit"
              value="これでOK！"
              className="text-[#2c2c2e] text-[14px] font-bold cursor-pointer"
            />
          </div>
        </div>
        <div className="bg-[#2A1515] rounded-xl px-4.5 py-3.5 shrink-0">
          <button className="font-semibold text-[14px] text-[#E05252] cursor-pointer whitespace-nowrap">
            削除する
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
