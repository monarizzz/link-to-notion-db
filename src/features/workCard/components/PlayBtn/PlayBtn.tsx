"use client";

import Play from "@public/play.svg";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import "@/libs/dayjs/config";

const PlayBtn = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="start"
      render={({ field: { onChange } }) => (
        <button
          type="button"
          className="rounded-3xl bg-accent-lime p-3 shadow-[0_0_12px_rgba(194,239,83,0.2)]"
          onClick={() => onChange(dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"))}
        >
          <Play className="h-4 w-4 text-[#3A3A3A]" alt="play" />
        </button>
      )}
    />
  );
};

export default PlayBtn;
