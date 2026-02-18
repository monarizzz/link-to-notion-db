"use server";

import { revalidatePath } from "next/cache";
import postPage from "@/infra/notion/repositories/postPage";
import type { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";

export const addWorkAction = async (
  properties: CreatePageParameters["properties"],
) => {
  await postPage(properties);
  revalidatePath("/");
};
