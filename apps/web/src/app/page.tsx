"use client";

import useSWR from "swr";

import { getJstTodayRange } from "@/commons/date/utils/getJstTodayRange";
import HomePageMain from "@/features/home/components/HomePageMain/HomePageMain";
import getLabels from "@/infra/api/getLabels";
import getWorkRecords from "@/infra/api/getWorkRecords";

const Home = () => {
  const todayRange = getJstTodayRange();

  const { data: labels, error: labelsErr } = useSWR("labels", getLabels);
  const {
    data: workRecords,
    error: workRecordsErr,
    mutate: mutateWorkRecords,
  } = useSWR(["workRecords", todayRange], () =>
    getWorkRecords(todayRange.from, todayRange.to),
  );

  if (labelsErr || workRecordsErr) return <div>エラーです</div>;
  if (!labels || !workRecords) return <div>読み込み中...</div>;

  return (
    <HomePageMain
      labels={labels}
      today={workRecords}
      todayRange={todayRange}
      onCreated={() => mutateWorkRecords()}
    />
  );
};

export default Home;
