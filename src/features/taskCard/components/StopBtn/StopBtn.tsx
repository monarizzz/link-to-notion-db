import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import "@/libs/dayjs/config";

const StopBtn = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="end"
      render={({ field: { onChange } }) => (
        <button
          type="button"
          onClick={() => onChange(dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"))}
          className="bg-[#357ff6ff] shadow-[0_0_12px_rgba(53,127,246,0.2)] p-[3.5px] rounded-3xl"
        >
          <Image src="/check.svg" width={39} height={39} alt="check" />
        </button>
      )}
    />
  );
};

export default StopBtn;
