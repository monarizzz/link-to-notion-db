"use client";

import { useEffect, useState } from "react";
import { getCurrent } from "../../utils/getCurrent";

type Props = {
  color: string;
  fontSizeProps: string;
  letterSpacingProps: string;
  format: "YYYY.MM.DD" | "M月 D日";
  home?: boolean;
};

const CurrentDate = ({
  color,
  fontSizeProps,
  letterSpacingProps,
  format,
  home,
}: Props) => {
  const [date, setDate] = useState(getCurrent(format));

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(getCurrent(format));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="font-dm-sans tracking-[2px] text-sm flex gap-2"
      style={{
        color: color,
        fontSize: fontSizeProps,
        letterSpacing: letterSpacingProps,
      }}
    >
      {home ? (
        <>
          <span>DAY</span>
          <span>/</span>
        </>
      ) : null}

      <span>{date}</span>
    </div>
  );
};

export default CurrentDate;
