import dayjs from "dayjs";

export const timeCalc = (
  isStart: boolean,
  sDate: string,
  sTime: string,
  eDate: string,
  eTime: string,
  hTotal: number,
  mTotal: number,
) => {
  if (isStart) {
    return dayjs(`${sDate} ${sTime}`).add(hTotal, "hour").add(mTotal, "minute");
  } else {
    return dayjs(`${eDate} ${eTime}`)
      .subtract(hTotal, "hour")
      .subtract(mTotal, "minute");
  }
};
