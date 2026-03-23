import Image from "next/image";
import { useWatch } from "react-hook-form";
import StopBtn from "../StopBtn/StopBtn";

type Props = {
  time: string;
};

const DoingContent = ({ time }: Props) => {
  const work = useWatch({ name: "label" });

  return (
    <>
      <div className="bg-[#357ff6ff] p-2.5 rounded-[10px]">
        <Image src="/timer.svg" width={20} height={20} alt="timer" />
      </div>
      <div className="flex flex-col gap-0.5 w-full">
        {work !== undefined ? (
          <span className="text-[#FAFAF9] text-[13px]">{work}</span>
        ) : (
          <span className="text-[#8E8E93] text-[11px] ml-0.5 mb-0.5 italic">
            未入力
          </span>
        )}
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-[50%] bg-[#357ff6] my-auto" />
          <span className="text-[#6B6B70] text-[11px]">{time}</span>
        </div>
      </div>
      <StopBtn />
    </>
  );
};

export default DoingContent;
