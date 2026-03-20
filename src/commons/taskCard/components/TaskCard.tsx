import Todo from "@/features/taskCard/components/Todo";
import Image from "next/image";
import LabelSelect from "@/commons/labelSelect/components/LabelSelect";

type Props = {
  isInput: boolean;
  todoDetail?: TodoDetail;
  labels: string[];
};

type TodoDetail = {
  time: string;
  work: string;
  priority?: "high" | "medium" | "low";
};

const TaskCard = ({ isInput, todoDetail, labels }: Props) => {
  return (
    <div className="flex items-center gap-3 bg-[#3A3A3A] py-3.5 px-4 rounded-3xl w-90">
      {!isInput && todoDetail ? (
        <Todo
          time={todoDetail.time}
          work={todoDetail.work}
          priority={todoDetail.priority}
        />
      ) : (
        <>
          <div className="bg-[#4A4A50] p-2.5 rounded-md">
            <Image src="/pen.svg" width={16} height={16} alt="pen" />
          </div>
          <div className="flex flex-col gap-0.5 w-full">
            <span className="text-[#6B6B70] text-[11px]">何をしますか？</span>
            <div>
              <LabelSelect
                labels={labels}
                placeholder="作業の種類"
                selectLabel="種類"
              />
            </div>
          </div>
          {/* 後々開始ボタンとする */}
          <div className="bg-[#c2ef53ff] shadow-[0_0_12px_rgba(194,239,83,0.2)] p-3 rounded-3xl">
            <Image src="/play.svg" width={16} height={16} alt="play" />
          </div>
        </>
      )}
    </div>
  );
};
export default TaskCard;
