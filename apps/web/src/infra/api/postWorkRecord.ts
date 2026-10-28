import "server-only";

import { apiClient } from "@/infra/api/client";
import {
  CreateWorkRecordInput,
  WorkRecord,
} from "@/infra/api/types/workRecord";

const postWorkRecord = async (
  input: CreateWorkRecordInput,
): Promise<WorkRecord> => {
  return apiClient("/api/work-records", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
};

export default postWorkRecord;
