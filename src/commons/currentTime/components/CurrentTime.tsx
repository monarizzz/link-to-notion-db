"use client";

import { useEffect, useState } from "react";
import { getCurrentTime } from "../entities/getCurrentTime";

const CurrentTime = ({}) => {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-[120px] text-[#FAFAF9] font-bold -tracking-[4px]">
      {time}
    </span>
  );
};

export default CurrentTime;
