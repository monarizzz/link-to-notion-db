"use client";

import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import dayjs from "dayjs";
import "@/libs/dayjs/config";
import { getCurrent } from "../../utils/getCurrent";

const CurrentTime = () => {
  const [time, setTime] = useState(getCurrent("HH:mm"));
  const [, setTick] = useState(1);

  const [start, end] = useWatch({ name: ["start", "end"] });

  useEffect(() => {
    if (end) return;

    const interval = setInterval(() => {
      setTime(getCurrent("HH:mm"));
      setTick((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [end]);

  return (
    <span
      className="text-foreground font-bold -tracking-[4px]"
      style={{ fontSize: "clamp(6rem, 15vw, 8rem)" }}
    >
      {start ? (
        <span>
          {dayjs.duration(dayjs().diff(dayjs(start))).format("HH:mm:ss")}
        </span>
      ) : (
        time
      )}
    </span>
  );
};

export default CurrentTime;
