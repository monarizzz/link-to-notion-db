import PriorityBadge from "@/commons/layout/components/PriorityBadge/PriorityBadge";
import { Checkbox } from "@/libs/shadcn/assets/ui/checkbox";
import ArrowRight from "@public/arrow-right.svg";

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
        <span className="text-foreground text-sm">{time}</span>
        <span className="text-foreground text-xs">{work}</span>
      </div>
      <div>
        <div className="w-8 h-8 bg-primary rounded-3xl flex">
          <ArrowRight
            className="items-center m-auto w-3.5 h-3.5 text-foreground"
            alt="arrow"
          />
        </div>
      </div>
    </>
  );
};

export default TodoContent;
