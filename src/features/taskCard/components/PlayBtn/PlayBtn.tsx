"use client";

import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import "@/libs/dayjs/config";

const PlayBtn = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="start"
      rules={{
        required: true,
      }}
      render={({ field: { onChange } }) => (
        <button
          className="bg-[#c2ef53ff] shadow-[0_0_12px_rgba(194,239,83,0.2)] p-3 rounded-3xl"
          onClick={() => onChange(dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"))}
        >
          <Image src="/play.svg" width={16} height={16} alt="play" />
        </button>
      )}
    />
  );
};

export default PlayBtn;
