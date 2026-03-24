"use client";

import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import dayjs from "dayjs";
import "@/libs/dayjs/config";
import { getCurrent } from "../../entities/getCurrent";

const CurrentTime = () => {
  const now = getCurrent("HH:mm");
  const [time, setTime] = useState(now);
  const [, setTick] = useState(1);

  const [start, end] = useWatch({ name: ["start", "end"] });

  useEffect(() => {
    if (end) return;

    const interval = setInterval(() => {
      setTime(now);
      setTick((t) => t + 1);
    }, 1000);

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
