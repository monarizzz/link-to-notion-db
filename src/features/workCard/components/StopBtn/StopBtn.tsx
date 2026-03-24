import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import "@/libs/dayjs/config";
import { useState } from "react";
import SubmitModal from "@/commons/modal/submitModal/components/SubmitModal";

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
            <Image src="/check.svg" width={39} height={39} alt="check" />
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
