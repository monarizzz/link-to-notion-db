import "server-only";

import { apiClient } from "@/infra/api/client";
import { WorkRecord } from "@/infra/api/types/workRecord";

const getWorkRecords = async (): Promise<WorkRecord[]> => {
  return apiClient("/api/work-records");
};

export default getWorkRecords;
