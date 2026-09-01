import { apiClient } from "./client";

export interface Scheme {
  id: string;
  scheme_code: string;
  name: string;
  description?: string;
  ministry?: string;
  target_sectors?: string[];
  target_business_types?: string[];
}

export function getSchemes() {
  return apiClient<Scheme[]>(
    "/api/v1/schemes/"
  );
}