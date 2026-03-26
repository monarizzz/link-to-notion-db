import Check from "@public/check.svg";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import "@/libs/dayjs/config";
import { useState } from "react";
import SubmitModal from "@/commons/modal/components/SubmitModal/SubmitModal";

const StopBtn = () => {
  const { control } = useFormContext();
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <Controller
      control={control}
      name="end"
      render={({ field: { onChange } }) => (
        <>
          <button
            type="button"
            onClick={() => {
              onChange(dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"));
              setIsOpenModal(true);
            }}
            className="bg-[#357ff6ff] shadow-[0_0_12px_rgba(53,127,246,0.2)] p-[3.5px] rounded-3xl"
          >
            <Check className="w-9.75 h-9.75 text-[#0B0B0E]" alt="check" />
          </button>
          <SubmitModal
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
          />
        </>
      )}
    />
  );
};

export default StopBtn;
