import TodoContent from "@/features/taskCard/components/TodoContent/TodoContent";
import InputContent from "@/features/taskCard/components/InputContent/InputContent";

type Props = {
  isInput: "todo" | "input" | "status";
  todoDetail?: TodoDetail;
  labels: string[];
};

type TodoDetail = {
  time: string;
  work: string;
  priority?: "high" | "medium" | "low";
};

const TaskCard = ({ isInput, todoDetail, labels }: Props) => {
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
    if (isInput === "input") {
      return <InputContent labels={labels} />;
    }
    return null;
  };

  return (
    <div className="flex items-center gap-3 bg-[#3A3A3A] py-3.5 px-4 rounded-3xl w-90">
      {renderContent()}
    </div>
  );
};

export default TaskCard;
