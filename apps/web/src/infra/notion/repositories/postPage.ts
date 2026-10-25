"use server";

import { notion } from "@/libs/notion/utils/client";
import type { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";

const postPage = async (properties: CreatePageParameters["properties"]) => {
  const response = await notion.pages.create({
    parent: { database_id: process.env.DATABASE_ID! },
    properties,
  });
  return response;
};

export default postPage;
