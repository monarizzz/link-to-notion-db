import { Label } from "@/infra/api/types/label";

export type WorkRecord = {
  id: string;
  title: string | null;
  started_at: string;
  ended_at: string;
  created_at: string;
  updated_at: string;
  labels: Pick<Label, "id" | "name" | "color">[];
};

export type CreateWorkRecordInput = {
  title?: string | null;
  started_at: string;
  ended_at: string;
  label_ids?: string[];
};
