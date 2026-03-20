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

  return <span>{time}</span>;
};

export default CurrentTime;
