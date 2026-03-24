"use client";

import { useEffect, useState } from "react";
import { getCurrentTime } from "../entities/getCurrentTime";
import { useWatch } from "react-hook-form";
import dayjs from "dayjs";
import "@/libs/dayjs/config";

const CurrentTime = () => {
  const [time, setTime] = useState(getCurrentTime());
  const [, setTick] = useState(1);

  const [start, end] = useWatch({ name: ["start", "end"] });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
      setTick((t) => t + 1);
    }, 1000);

    if (end) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [end]);

  return (
    <span className="text-[120px] text-[#FAFAF9] font-bold -tracking-[4px]">
      {start ? (
        <p>{dayjs.duration(dayjs().diff(dayjs(start))).format("HH:mm:ss")}</p>
      ) : (
        time
      )}
    </span>
  );
};

export default CurrentTime;
