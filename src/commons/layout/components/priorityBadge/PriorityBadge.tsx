type Props = {
  priority?: "low" | "medium" | "high";
};

const bgColor: Record<NonNullable<Props["priority"]>, string> = {
  high: "bg-[#E85A4F]",
  medium: "bg-[#FFB547]",
  low: "bg-[#32D583]",
};

const PriorityBadge = ({ priority }: Props) => {
  const style = priority ? bgColor[priority] : "border border-[#646464]";
  return <div className={`w-2.5 h-2.5 rounded-[50%] ${style}`} />;
};

export default PriorityBadge;
