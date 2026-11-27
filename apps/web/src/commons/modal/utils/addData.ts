"use server";

import postWorkRecord from "@/infra/api/postWorkRecord";
import type { DataForm } from "@/libs/forms/schema/DataForm";

export const addData = async (data: DataForm) => {
  await postWorkRecord({
    title: data.title,
    started_at: data.start,
    ended_at: data.end,
    label_ids: data.label ? [data.label] : [],
  });
};
