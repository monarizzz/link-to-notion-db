"use client";

import { useEffect, useState } from "react";
import { getCurrentTime } from "../entities/getCurrentTime";
import { useWatch } from "react-hook-form";
import dayjs from "dayjs";
import "@/libs/dayjs/config";

const CurrentTime = () => {
  const [time, setTime] = useState(getCurrentTime());
  const start = useWatch({ name: "start" });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-[120px] text-[#FAFAF9] font-bold -tracking-[4px]">
      {start ? (
        <p>{dayjs.duration(dayjs().diff(dayjs(start))).format("HH:mm")}</p>
      ) : (
        time
      )}
    </span>
  );
};

export default CurrentTime;
