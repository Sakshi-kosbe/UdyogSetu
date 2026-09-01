import {
  RequirementDiscoveryResponse,
} from "./requirement";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://127.0.0.1:8000/api/v1";


export async function discoverRequirements(
  businessId: string
): Promise<RequirementDiscoveryResponse> {

  const response = await fetch(
    `${API_BASE_URL}/requirements/discover/${businessId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to discover requirements."
    );
  }

  return response.json();
}