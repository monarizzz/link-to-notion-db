import { notion } from "@/libs/notion/utils/client";
import { getDatabaseRecordsResponse } from "../entities/record";

const getDatabaseRecords = async (): Promise<getDatabaseRecordsResponse> => {
  return await notion.dataSources.query({
    data_source_id: process.env.DATA_SOURCE_ID!,
  });
};

export default getDatabaseRecords;
import type { QueryDataSourceResponse } from "@notionhq/client/build/src/api-endpoints";
