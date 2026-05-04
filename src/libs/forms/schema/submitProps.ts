import { DataForm } from "./DataForm";

export const submitProps = (data: DataForm) => ({
  title: { title: [{ text: { content: data.title ?? "" } }] },
  workTime: {
    date: {
      start: data.start,
      end: data.end,
    },
  },
  ...(data.label && { select: { select: { name: data.label } } }),
});
