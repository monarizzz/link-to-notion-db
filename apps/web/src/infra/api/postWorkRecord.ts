import "server-only";

import { apiClient } from "@/infra/api/client";
import { CreateWorkRecordInput } from "@/infra/api/types/workRecord";

const postWorkRecord = async (input: CreateWorkRecordInput) => {
  const response = await apiClient().api["work-records"].$post({
    json: input,
  });

  /* 400・422 はサーバーが errorResponse で返すので、本文から内容を読める */
  if (response.status === 400 || response.status === 422) {
    const { error } = await response.json();
    throw new Error(
      `API の作成に失敗しました (${response.status} ${error.code}: ${error.message})`,
    );
  }

  if (!response.ok) {
    throw new Error(`API の作成に失敗しました (${response.status})`);
  }

  return response.json();
};

export default postWorkRecord;
