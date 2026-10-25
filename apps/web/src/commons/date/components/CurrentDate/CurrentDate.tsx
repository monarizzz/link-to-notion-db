"use client";

import { useEffect, useState } from "react";
import { getCurrent } from "../../utils/getCurrent";

type Props = {
  color: string;
  fontSizeProps: string;
  letterSpacingProps: string;
  format: "YYYY.MM.DD" | "M月 D日";
  home?: boolean;
  bold?: boolean;
};

const CurrentDate = ({
  color,
  fontSizeProps,
  letterSpacingProps,
  format,
  home,
  bold,
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
      className="flex gap-2 font-dm-sans text-sm tracking-[2px]"
      style={{
        color: color,
        fontSize: fontSizeProps,
        letterSpacing: letterSpacingProps,
        fontWeight: bold ? "bold" : undefined,
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
