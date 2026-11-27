import dayjs from "dayjs";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import SubmitModal from "@/commons/modal/components/SubmitModal/SubmitModal";
import type { Label } from "@/infra/client";
import { DATETIME_FORMAT } from "@/libs/dayjs/config";
import Check from "@public/check.svg";

type Props = {
  labels: Label[];
};

const StopBtn = ({ labels }: Props) => {
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
              onChange(dayjs().format(DATETIME_FORMAT));
              setIsOpenModal(true);
            }}
            className="rounded-3xl bg-doing p-[3.5px] shadow-[0_0_12px_rgba(53,127,246,0.2)]"
          >
            <Check className="size-8 text-[#0B0B0E]" alt="check" />
          </button>
          <SubmitModal
            labels={labels}
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
          />
        </>
      )}
    />
  );
};

export default StopBtn;
