"use server";

import deleteWorkRecord from "@/infra/api/deleteWorkRecord";
import { revalidatePath } from "next/cache";

const pageDel = async (pageId: string) => {
  await deleteWorkRecord(pageId);
  revalidatePath("/");
};

export default pageDel;
