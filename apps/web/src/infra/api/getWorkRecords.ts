import "server-only";

import { apiClient } from "@/infra/api/client";

/* from・to はエポックミリ秒。範囲と重なる記録を返す */
const getWorkRecords = async (from: number, to: number) => {
  const response = await apiClient().api["work-records"].$get({
    query: { from: String(from), to: String(to) },
  });

  if (!response.ok) {
    throw new Error(`API の取得に失敗しました (${response.status})`);
  }

  return response.json();
};

export default getWorkRecords;
