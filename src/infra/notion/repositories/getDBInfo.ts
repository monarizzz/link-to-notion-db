import { notion } from "@/libs/notion/utils/client";

/* DATA_SOURCE_ID を取得するために使用 基本的には使わない */
const getDBInfo = async () => {
  return await notion.databases.retrieve({
    database_id: process.env.DATABASE_ID!,
  });
};

export default getDBInfo;
