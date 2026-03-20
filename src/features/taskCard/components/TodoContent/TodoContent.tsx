import PriorityBadge from "@/commons/priorityBadge/components/PriorityBadge";
import { Checkbox } from "@/libs/shadcn/assets/ui/checkbox";
import Image from "next/image";

type Props = {
  time: string;
  work: string;
  priority?: "high" | "medium" | "low";
};

const TodoContent = ({ time, work, priority }: Props) => {
  return (
    <>
      <Checkbox className="size-5.5 rounded-[6px] border-[#909097]" />
      <div>
        <PriorityBadge priority={priority} />
      </div>
      <div className="flex flex-col gap-0.5 w-full">
        <span className="text-[#FAFAF9] text-sm">{time}</span>
        <span className="text-[#8E8E93] text-xs">{work}</span>
      </div>
      <div>
        <div className="w-8 h-8 bg-[#4A4A50] rounded-3xl flex">
          <Image
            className="items-center m-auto"
            src="/arrow-right.svg"
            width={14}
            height={14}
            alt="arrow"
          />
        </div>
      </div>
    </>
  );
};

export default TodoContent;
