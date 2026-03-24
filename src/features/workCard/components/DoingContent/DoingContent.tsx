import Image from "next/image";
import { useWatch } from "react-hook-form";
import StopBtn from "../StopBtn/StopBtn";
import dayjs from "dayjs";
import "@/libs/dayjs/config";

const DoingContent = () => {
  const [start, label] = useWatch({ name: ["start", "label"] });

  return (
    <>
      <div className="bg-[#357ff6ff] p-2.5 rounded-[10px]">
        <Image src="/timer.svg" width={20} height={20} alt="timer" />
      </div>
      <div className="flex flex-col gap-0.5 w-full">
        {label !== undefined ? (
          <span className="text-[#FAFAF9] text-[13px]">{label}</span>
        ) : (
          <span className="text-[#8E8E93] text-[11px] ml-0.5 mb-0.5 italic">
            未入力
          </span>
        )}
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-[50%] bg-[#357ff6] my-auto" />
          <span className="text-[#6B6B70] text-[11px]">
            {dayjs(start).format("HH:mm")}~
          </span>
        </div>
      </div>
      <StopBtn />
    </>
  );
};

export default DoingContent;
