import { Separator } from "@/libs/shadcn/assets/ui/separator";

type Props = {
  vertical?: boolean;
};

const Line = ({ vertical }: Props) => {
  if (vertical) {
    return (
      <div className="self-stretch h-auto">
        <Separator orientation="vertical" />
      </div>
    );
  }
  return <Separator />;
};

export default Line;
