"use client";

import { useEffect, useState } from "react";
import { getCurrentTime } from "../entities/getCurrentTime";

type Props = { isTimer: boolean };

const CurrentTime = ({ isTimer }: Props) => {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-[120px] text-[#FAFAF9] font-bold -tracking-[4px]">
      {isTimer ? <p>経過時間</p> : time}
    </span>
  );
};

export default CurrentTime;
