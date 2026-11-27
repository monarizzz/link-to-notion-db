import postWorkRecord from "@/infra/api/postWorkRecord";
import type { DataForm } from "@/libs/zod/workRecordSchema";

/* 記録フォームの値を作業記録として保存する */
export const saveWorkRecord = (data: DataForm) =>
  postWorkRecord({
    title: data.title,
    started_at: data.start,
    ended_at: data.end,
    label_ids: data.label ? [data.label] : [],
  });
