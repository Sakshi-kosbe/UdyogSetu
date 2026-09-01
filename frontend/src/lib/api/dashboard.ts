import { getBusinesses } from "./businesses";
import { getRequirements } from "./requirements";
import { getApplications } from "./applications";
import {
  getComplianceRecords,
  getOverdueCompliance,
} from "./compliance";
import { getSchemes } from "./schemes";

export interface DashboardStats {
  businesses: number;
  requirements: number;
  applications: number;
  compliances: number;
  overdueCompliance: number;
  schemes: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [
    businesses,
    requirements,
    applications,
    compliances,
    overdueCompliance,
    schemes,
  ] = await Promise.all([
    getBusinesses(),
    getRequirements(),
    getApplications(),
    getComplianceRecords(),
    getOverdueCompliance(),
    getSchemes(),
  ]);

  return {
    businesses: businesses.length,
    requirements: requirements.length,
    applications: applications.length,
    compliances: compliances.length,
    overdueCompliance: overdueCompliance.length,
    schemes: schemes.length,
  };
}