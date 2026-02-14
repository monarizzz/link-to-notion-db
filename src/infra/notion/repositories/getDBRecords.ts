import { notion } from "@/libs/notion/utils/client";

// TODO:型定義がSDKと合っていない問題
const getDBRecords = async () => {
  const response = await notion.dataSources.query({
    data_source_id: process.env.DATA_SOURCE_ID!,
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });
  return response;
};

export default getDBRecords;
