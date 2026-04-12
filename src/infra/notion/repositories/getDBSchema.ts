import { notion } from "@/libs/notion/utils/client";

/* DBのメタ情報を取得する */
const getDBSchema = async () => {
  const response = await notion.dataSources.retrieve({
    data_source_id: process.env.DATA_SOURCE_ID!,
  });
  return response;
};

export default getDBSchema;
