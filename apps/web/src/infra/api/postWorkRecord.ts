import "server-only";

import { apiClient } from "@/infra/api/client";
import { CreateWorkRecordInput } from "@/infra/api/types/workRecord";

const postWorkRecord = async (input: CreateWorkRecordInput) => {
  const response = await apiClient().api["work-records"].$post({
    json: input,
  });

  if (!response.ok) {
    throw new Error(`API の作成に失敗しました (${response.status})`);
  }

  return response.json();
};

export default postWorkRecord;
