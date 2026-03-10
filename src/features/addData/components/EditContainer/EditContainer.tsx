import NumberStepper from "../NumberStepper/NumberStepper";
import ToggleTabs from "../ToggleTabs/ToggleTabs";
import Image from "next/image";

type Props = {
  hours: number;
  minutes: number;
  // onHoursChange: (value: number) => void;
  // onMinutesChange: (value: number) => void;
};

const EditContainer = ({
  hours,
  minutes,
  // onHoursChange,
  // onMinutesChange,
}: Props) => {
  return (
    <div className="py-3 px-5 flex gap-2.5 justify-between overflow-hidden">
      <ToggleTabs />
      <Image src={"/arrow-right.svg"} alt="arrow" width={13} height={13} />
      <div className="flex gap-2.5 items-center">
        <NumberStepper defaultValue={hours} digits={1} />
        <span className="text-2xs font-medium text-subtle-foreground">
          時間
        </span>
        <NumberStepper
          defaultValue={minutes}
          max={60}
          digits={2}
          // onChange={onMinutesChange}
        />
        <span className="text-2xs font-medium uppercase text-subtle-foreground">
          分
        </span>
      </div>
    </div>
  );
};

export default EditContainer;
