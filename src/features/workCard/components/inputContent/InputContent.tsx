import LabelSelect from "@/commons/modal/components/LabelSelect/LabelSelect";
import PlayBtn from "../PlayBtn/PlayBtn";
import Pen from "@public/pen.svg";

type Props = {
  labels: string[];
};

const InputContent = ({ labels }: Props) => {
  return (
    <>
      <div className="rounded-md bg-primary p-2.5">
        <Pen className="size-4 text-foreground" alt="pen" />
      </div>
      <div className="flex w-full flex-col gap-1.25">
        <span className="text-[11px] text-primary-foreground">
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
