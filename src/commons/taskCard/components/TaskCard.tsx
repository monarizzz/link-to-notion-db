import TodoContent from "@/features/taskCard/components/TodoContent/TodoContent";
import InputContent from "@/features/taskCard/components/inputContent/InputContent";
import DoingContent from "@/features/taskCard/components/DoingContent/DoingContent";
import { useWatch } from "react-hook-form";

type Props = {
  isInput: "todo" | "timer";
  todoDetail?: TodoDetail;
  labels: string[];
};

type TodoDetail = {
  time: string;
  work: string;
  priority?: "high" | "medium" | "low";
};

const TaskCard = ({ isInput, todoDetail, labels }: Props) => {
  const [start] = useWatch({ name: ["start"] });

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
      if (start) {
        return <DoingContent />;
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
