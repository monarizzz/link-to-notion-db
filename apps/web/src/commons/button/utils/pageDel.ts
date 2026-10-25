"use server";

import patchPage from "@/infra/notion/repositories/patchPage";
import { revalidatePath } from "next/cache";

const pageDel = async (pageId: string) => {
  await patchPage(pageId, true);
  revalidatePath("/");
};

export default pageDel;
