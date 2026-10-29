import "server-only";

import { apiClient } from "@/infra/api/client";

const getWorkRecords = async () => {
  const response = await apiClient().api["work-records"].$get();

  if (!response.ok) {
    throw new Error(`API の取得に失敗しました (${response.status})`);
  }

  return response.json();
};

export default getWorkRecords;
