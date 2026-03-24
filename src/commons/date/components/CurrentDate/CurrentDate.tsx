"use client";

import { useEffect, useState } from "react";
import { getCurrent } from "../../entities/getCurrent";

const CurrentDate = () => {
  const now = getCurrent("YYYY.MM.DD");
  const [date, setDate] = useState(now);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(now);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[#8E8E93] font-dm-sans tracking-[2px] text-sm flex gap-2">
      <span>DAY</span>
      <span>/</span>
      <span>{date}</span>
    </div>
  );
};

export default CurrentDate;
