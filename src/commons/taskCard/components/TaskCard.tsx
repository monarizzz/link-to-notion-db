import PriorityBadge from "@/commons/priorityBadge/components/PriorityBadge";
import { Checkbox } from "@/libs/shadcn/assets/ui/checkbox";

type Props = {
  time: string;
  work: string;
  priority?: "high" | "medium" | "low";
};

const TaskCard = ({ time, work, priority }: Props) => {
  return (
    <div className="flex items-center gap-3.5 bg-[#3A3A3A] py-3.5 px-4 rounded-3xl w-90">
      <Checkbox className="size-5.5 rounded-[6px] border-[#909097]" />
      <div>
        <PriorityBadge priority={priority} />
      </div>
      <div className="flex flex-col gap-0.5 w-full">
        <span className="text-[#FAFAF9] text-sm">{time}</span>
        <span className="text-[#8E8E93] text-xs">{work}</span>
      </div>
      <div>
        <div className="w-8 h-8 bg-[#4A4A50] rounded-3xl">→</div>
      </div>
    </div>
  );
};
export default TaskCard;
