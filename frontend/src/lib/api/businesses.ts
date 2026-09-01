import { apiClient } from "./client";

export interface Business {
  id: string;
  name: string;
  business_type?: string;
  sector?: string;
  industry?: string;
  state?: string;
  location?: string;
  investment_amount?: number;
  created_at?: string;
}

export function getBusinesses() {
  return apiClient<Business[]>(
    "/api/v1/businesses/"
  );
}

export function getBusiness(
  businessId: string
) {
  return apiClient<Business>(
    `/api/v1/businesses/${businessId}`
  );
}