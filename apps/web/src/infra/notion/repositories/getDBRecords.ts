import { notion } from "@/libs/notion/utils/client";
import { QueryDataSourceParameters } from "@notionhq/client/build/src/api-endpoints";

type Filter = QueryDataSourceParameters["filter"];

const getDBRecords = async (filter?: Filter) => {
  const response = await notion.dataSources.query({
    data_source_id: process.env.DATA_SOURCE_ID!,
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
    ...(filter ? { filter: { ...filter } } : {}),
  });
  return response;
};

export default getDBRecords;
