import { Separator } from "@/libs/shadcn/assets/ui/separator";
import Image from "next/image";

type Props = {
  text: string;
};

const TimeField = ({ text }: Props) => {
  return (
    <div className="flex gap-2.5 px-3.5 items-center">
      <Image src="time.svg" width={10} height={10} alt="time" />
      <span className="text-2xs font-medium  text-subtle-foreground pr-3.5">
        {text}
      </span>
      <div className="self-stretch h-auto py-4 ">
        <Separator orientation="vertical" />
      </div>
    </div>
  );
};

export default TimeField;
