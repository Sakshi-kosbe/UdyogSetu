import { apiClient } from "./client";

export interface Compliance {
  id: string;
  business_id: string;
  requirement_code?: string;
  compliance_name?: string;
  status?: string;
  due_date?: string;
  renewal_date?: string;
}

export function getComplianceRecords() {
  return apiClient<Compliance[]>(
    "/api/v1/compliance/"
  );
}

export function getOverdueCompliance() {
  return apiClient<Compliance[]>(
    "/api/v1/compliance/overdue"
  );
}

export function getUpcomingRenewals() {
  return apiClient<Compliance[]>(
    "/api/v1/compliance/renewals/upcoming"
  );
}