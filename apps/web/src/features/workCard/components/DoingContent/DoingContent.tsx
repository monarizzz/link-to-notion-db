import Timer from "@public/timer.svg";
import { useWatch } from "react-hook-form";
import StopBtn from "../StopBtn/StopBtn";
import dayjs from "dayjs";
import "@/libs/dayjs/config";
import type { Label } from "@/infra/api/client";

type Props = {
  labels: Label[];
};

const DoingContent = ({ labels }: Props) => {
  const [start, label] = useWatch({ name: ["start", "label"] });
  const labelName = labels.find(({ id }) => id === label)?.name;

  return (
    <>
      <div className="rounded-[10px] bg-doing p-2.5">
        <Timer className="h-5 w-5 text-doing-foreground" alt="timer" />
      </div>
      <div className="flex w-full flex-col gap-0.5">
        {labelName !== undefined ? (
          <span className="text-[13px] text-foreground">{labelName}</span>
        ) : (
          <span className="mb-0.5 ml-0.5 text-[11px] text-foreground italic">
            未入力
          </span>
        )}
        <div className="flex gap-1.5">
          <div className="my-auto h-1.5 w-1.5 rounded-[50%] bg-doing" />
          <span className="text-[11px] text-primary-foreground">
            {dayjs(start).format("HH:mm")}~
          </span>
        </div>
      </div>
      <StopBtn labels={labels} />
    </>
  );
};

export default DoingContent;
