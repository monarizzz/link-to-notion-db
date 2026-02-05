import { notion } from "@/libs/notion/utils/client";

const getDatabaseRecords = async () => {
  return await notion.dataSources.query({
    data_source_id: process.env.DATA_SOURCE_ID!,
  });
};

export default getDatabaseRecords;
