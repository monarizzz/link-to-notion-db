"use client";

import { useEffect, useState } from "react";
import { getCurrent } from "../../utils/getCurrent";

const CurrentDate = () => {
  const [date, setDate] = useState(getCurrent("YYYY.MM.DD"));

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(getCurrent("YYYY.MM.DD"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-foreground font-dm-sans tracking-[2px] text-sm flex gap-2">
      <span>DAY</span>
      <span>/</span>
      <span>{date}</span>
    </div>
  );
};

export default CurrentDate;
