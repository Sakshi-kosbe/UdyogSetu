import { apiClient } from "./client";

export interface Application {
  id: string;
  business_id: string;
  business_name?: string;
  requirement_code: string;
  requirement_name?: string;
  status: string;
  current_stage?: string;
  created_at?: string;
}

export function getApplications() {
  return apiClient<Application[]>(
    "/api/v1/applications/"
  );
}