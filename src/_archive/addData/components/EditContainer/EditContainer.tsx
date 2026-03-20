"use client";

import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { AddDataForm } from "@/commons/addData/components/AddData";
import { timeCalc } from "@/commons/addData/entities/timeCalc";
import NumberStepper from "../NumberStepper/NumberStepper";
import ToggleTabs from "../ToggleTabs/ToggleTabs";
import Image from "next/image";

const EditContainer = () => {
  const { setValue, control } = useFormContext<AddDataForm>();

  const [isStart, sDate, sTime, eDate, eTime, hTotal, mTotal] = useWatch({
    control,
    name: ["isStart", "sDate", "sTime", "eDate", "eTime", "hTotal", "mTotal"],
  });

  // isStart=true（開始基準）: sDate/sTime + duration → eDate/eTime を更新
  useEffect(() => {
    if (!isStart) return;
    const result = timeCalc(true, sDate, sTime, eDate, eTime, hTotal, mTotal);
    setValue("eDate", result.format("YYYY-MM-DD"));
    setValue("eTime", result.format("HH:mm"));
  }, [isStart, sDate, sTime, hTotal, mTotal]);

  // isStart=false（終了基準）: eDate/eTime - duration → sDate/sTime を更新
  useEffect(() => {
    if (isStart) return;
    const result = timeCalc(false, sDate, sTime, eDate, eTime, hTotal, mTotal);
    setValue("sDate", result.format("YYYY-MM-DD"));
    setValue("sTime", result.format("HH:mm"));
  }, [isStart, eDate, eTime, hTotal, mTotal]);

  return (
    <div className="py-3 px-5 flex gap-2.5 justify-between overflow-hidden">
      <ToggleTabs />
      <Image src={"/arrow-right.svg"} alt="arrow" width={13} height={13} />
      <div className="flex gap-2.5 items-center">
        <NumberStepper name="hTotal" defaultValue={2} />
        <span className="text-2xs font-medium text-subtle-foreground">
          時間
        </span>
        <NumberStepper name="mTotal" defaultValue={0} max={60} />
        <span className="text-2xs font-medium text-subtle-foreground">分</span>
      </div>
    </div>
  );
};

export default EditContainer;
