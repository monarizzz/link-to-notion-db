"use client";

import { useEffect, useState } from "react";
import { getCurrentDate } from "../entities/getCurrentDate";

const CurrentDate = () => {
  const [date, setDate] = useState(getCurrentDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(getCurrentDate());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[#8E8E93] font-dm-sans tracking-[2px] text-sm">
      <span>DAY</span>
      <span>/</span>
      <span>{date}</span>
    </div>
  );
};

export default CurrentDate;
