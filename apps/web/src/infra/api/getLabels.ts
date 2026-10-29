import "server-only";

import { apiClient } from "@/infra/api/client";

const getLabels = async () => {
  const response = await apiClient().api.labels.$get();

  if (!response.ok) {
    throw new Error(`API の取得に失敗しました (${response.status})`);
  }

  return response.json();
};

export default getLabels;
