import { Input } from "@/libs/shadcn/assets/ui/input";
import Image from "next/image";

const size = 20;

const TimePicker = ({ ...register }) => {
  return (
    <>
      <>
        <input
          type="time"
          id="start"
          {...register("start", { required: true })}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
        <Image src="time.svg" alt="time" width={size} height={size} />
      </>
    </>
  );
};

export default TimePicker;
