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
      <div className="flex w-full flex-col gap-0.5">
        <span className="text-sm text-foreground">{time}</span>
        <span className="text-xs text-foreground">{work}</span>
      </div>
      <div>
        <div className="flex h-8 w-8 rounded-3xl bg-primary">
          <ArrowRight
            className="m-auto h-3.5 w-3.5 items-center text-foreground"
            alt="arrow"
          />
        </div>
      </div>
    </>
  );
};

export default TodoContent;
