export interface Requirement {
  id?: string;

  requirement_id?: string;

  name?: string;

  title?: string;

  description?: string;

  category?: string;

  authority?: string;

  priority?: string;

  status?: string;

  applicability_reason?: string;

  why_applies?: string;

  official_source?: string;
}

export interface RequirementDiscoveryResponse {
  business_id: string;

  business_name?: string;

  requirements?: Requirement[];

  matched_requirements?: Requirement[];
}