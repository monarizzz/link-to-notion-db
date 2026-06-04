import { Separator } from "@/libs/shadcn/assets/ui/separator";

type Props = {
  vertical?: boolean;
  dashed?: boolean;
};

const CommonSeparator = ({ vertical, dashed }: Props) => {
  const dashedClass = dashed
    ? vertical
      ? "bg-transparent border-l border-dashed border-border w-0"
      : "bg-transparent border-t border-dashed border-border h-0"
    : undefined;

  if (vertical) {
    return (
      <div className="self-stretch h-auto">
        <Separator orientation="vertical" className={dashedClass} />
      </div>
    );
  }
  return <Separator className={dashedClass} />;
};

export default CommonSeparator;
