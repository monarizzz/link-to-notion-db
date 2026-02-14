"use server";

import patchPageRecords from "@/infra/notion/repositories/patchPageRecords";
import { revalidatePath } from "next/cache";

const recordDel = async (pageId: string) => {
  await patchPageRecords(pageId, true);
  revalidatePath("/");
};

export default recordDel;
