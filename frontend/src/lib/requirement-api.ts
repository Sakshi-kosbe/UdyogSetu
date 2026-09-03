import { Requirement } from "@/lib/requirement";


const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";


export async function discoverRequirements(
  businessId: string
): Promise<Requirement[]> {

  const response = await fetch(
    `${API_BASE_URL}/api/v1/requirements/discover/${businessId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {

    const errorData = await response
      .json()
      .catch(() => null);

    throw new Error(
      errorData?.detail ||
      "Failed to discover requirements."
    );
  }

  return response.json();
}