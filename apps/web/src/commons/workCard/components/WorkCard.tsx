import DoingContent from "@/features/workCard/components/DoingContent/DoingContent";
import { useWatch } from "react-hook-form";
import InputContent from "@/features/workCard/components/inputContent/InputContent";
import type { Label } from "@/infra/api/client";

type Props = {
  todoDetail?: TodoDetail;
  labels: Label[];
};

type TodoDetail = {
  time: string;
  work: string;
  priority?: "high" | "medium" | "low";
};

const WorkCard = ({ labels }: Props) => {
  const [start] = useWatch({ name: ["start"] });

  const renderContent = () => {
    if (start) {
      return <DoingContent labels={labels} />;
    }
    return <InputContent labels={labels} />;
  };

  return (
    <div className="flex w-90 items-center gap-3 rounded-3xl bg-[#3A3A3A] px-4 py-3.5">
      {renderContent()}
    </div>
  );
};

export default WorkCard;
