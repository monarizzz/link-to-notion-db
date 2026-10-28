import "server-only";

import { apiClient } from "@/infra/api/client";
import { Label } from "@/infra/api/types/label";

const getLabels = async (): Promise<Label[]> => {
  return apiClient("/api/labels");
};

export default getLabels;
