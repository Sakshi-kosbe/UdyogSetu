import {
  Requirement,
  RequirementDiscoveryResponse,
} from "@/lib/requirement";


const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://127.0.0.1:8000/api/v1";


export async function discoverRequirements(
  businessId: string
): Promise<Requirement[]> {

  const response = await fetch(
    `${API_BASE_URL}/requirements/discover/${businessId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {

    throw new Error(
      "Failed to discover requirements."
    );
  }

  const data: RequirementDiscoveryResponse =
    await response.json();


  return (
    data.requirements ||
    data.matched_requirements ||
    []
  );
}