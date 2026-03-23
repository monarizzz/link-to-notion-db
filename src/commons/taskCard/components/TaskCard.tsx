import TodoContent from "@/features/taskCard/components/TodoContent/TodoContent";
import InputContent from "@/features/taskCard/components/InputContent/InputContent";
import DoingContent from "@/features/taskCard/components/doingContent/doingContent";
import { useWatch } from "react-hook-form";

type Props = {
  isInput: "todo" | "timer";
  todoDetail?: TodoDetail;
  labels: string[];
  time: string;
};

type TodoDetail = {
  time: string;
  work: string;
  priority?: "high" | "medium" | "low";
};

const TaskCard = ({ isInput, todoDetail, labels, time }: Props) => {
  const [start, end] = useWatch({ name: ["start", "end"] });

  const renderContent = () => {
    if (isInput === "todo" && todoDetail) {
      return (
        <TodoContent
          time={todoDetail.time}
          work={todoDetail.work}
          priority={todoDetail.priority}
        />
      );
    }
    if (isInput === "timer") {
      if (start && !end) {
        return <DoingContent time={time} />;
      }
      return <InputContent labels={labels} />;
    }
  };

  return (
    <div className="flex items-center gap-3 bg-[#3A3A3A] py-3.5 px-4 rounded-3xl w-90">
      {renderContent()}
    </div>
  );
};

export default TaskCard;
