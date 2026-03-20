import PriorityBadge from "@/commons/priorityBadge/components/PriorityBadge";

type Props = {
  time: string;
  work: string;
};

const TaskCard = ({ time, work }: Props) => {
  return (
    <div>
      <div>チェックボックス</div>
      <PriorityBadge />
      <span>{time}</span>
      <span>{work}</span>
      <button></button>
    </div>
  );
};
export default TaskCard;
