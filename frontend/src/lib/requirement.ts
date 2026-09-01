export interface Requirement {
  id: string;
  name: string;
  description?: string;
  category?: string;
  authority?: string;
  status?: string;
  applicability_reason?: string;
  reason?: string;
}

export interface RequirementDiscoveryResponse {
  business_id?: string;
  requirements?: Requirement[];
  matched_requirements?: Requirement[];
}