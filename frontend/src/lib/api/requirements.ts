import { apiClient } from "./client";

export interface Requirement {
  id?: string;
  requirement_code: string;
  name: string;
  description?: string;
  category?: string;
  authority?: string;
  status?: string;
}

export function getRequirements() {
  return apiClient<Requirement[]>(
    "/api/v1/requirements/"
  );
}