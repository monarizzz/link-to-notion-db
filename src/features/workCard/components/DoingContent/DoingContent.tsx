import Timer from "@public/timer.svg";
import { useWatch } from "react-hook-form";
import StopBtn from "../StopBtn/StopBtn";
import dayjs from "dayjs";
import "@/libs/dayjs/config";

const DoingContent = () => {
  const [start, label] = useWatch({ name: ["start", "label"] });

  return (
    <>
      <div className="bg-doing p-2.5 rounded-[10px]">
        <Timer className="text-doing-foreground w-5 h-5" alt="timer" />
      </div>
      <div className="flex flex-col gap-0.5 w-full">
        {label !== undefined ? (
          <span className="text-foreground text-[13px]">{label}</span>
        ) : (
          <span className="text-foreground text-[11px] ml-0.5 mb-0.5 italic">
            未入力
          </span>
        )}
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-[50%] bg-doing my-auto" />
          <span className="text-primary-foreground text-[11px]">
            {dayjs(start).format("HH:mm")}~
          </span>
        </div>
      </div>
      <StopBtn />
    </>
  );
};

export default DoingContent;
