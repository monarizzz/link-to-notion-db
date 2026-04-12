import LabelSelect from "@/commons/modal/components/LabelSelect/LabelSelect";
import PlayBtn from "../PlayBtn/PlayBtn";
import Pen from "@public/pen.svg";

type Props = {
  labels: string[];
};

const InputContent = ({ labels }: Props) => {
  return (
    <>
      <div className="bg-primary p-2.5 rounded-md">
        <Pen className="size-4 text-foreground" alt="pen" />
      </div>
      <div className="flex flex-col gap-1.25 w-full">
        <span className="text-primary-foreground text-[11px]">
          何をしますか？
        </span>
        <div>
          <LabelSelect
            labels={labels}
            placeholder="作業の種類"
            selectLabel="種類"
          />
        </div>
      </div>
      <PlayBtn />
    </>
  );
};

export default InputContent;
