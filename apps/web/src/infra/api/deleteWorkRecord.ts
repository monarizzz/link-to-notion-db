import "server-only";

import { apiClient } from "@/infra/api/client";

const deleteWorkRecord = async (id: string) => {
  const response = await apiClient().api["work-records"][":id"].$delete({
    param: { id },
  });

  /* 404 はサーバーが errorResponse で返すので、本文から内容を読める */
  if (response.status === 404) {
    const { error } = await response.json();
    throw new Error(
      `API の削除に失敗しました (${response.status} ${error.code}: ${error.message})`,
    );
  }

  if (!response.ok) {
    throw new Error(`API の削除に失敗しました (${response.status})`);
  }
};

export default deleteWorkRecord;
