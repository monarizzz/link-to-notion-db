import { notion } from "@/libs/notion/utils/client";

const patchPage = async (pageId: string, archived?: boolean) => {
  const response = await notion.pages.update({
    page_id: pageId,
    ...(archived !== undefined && { archived }),
  });
  return response;
};

export default patchPage;
