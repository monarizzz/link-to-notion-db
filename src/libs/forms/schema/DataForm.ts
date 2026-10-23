import { z } from "zod";
import dayjs from "dayjs";

export const formSchema = z
  .object({
    start: z.string().min(1, "開始日時を入力してください"),
    end: z.string().min(1, "終了日時を入力してください"),
    label: z.string().optional(),
    title: z.string().optional(),
  })
  .refine(({ start, end }) => dayjs(start).isBefore(dayjs(end)), {
    message: "開始時間は終了時間より前にしてください",
    path: ["end"],
  });

export type DataForm = z.infer<typeof formSchema>;
