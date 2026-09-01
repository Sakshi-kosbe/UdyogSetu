import { Business } from "@/lib/business";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://127.0.0.1:8000/api/v1";


export interface CreateBusinessPayload {
  name: string;
  industry: string;
  business_size: string;
  location: string;
  activity: string;
}


export async function getBusinesses(): Promise<Business[]> {
  const response = await fetch(
    `${API_BASE_URL}/businesses/`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch businesses."
    );
  }

  return response.json();
}


export async function createBusiness(
  business: CreateBusinessPayload
): Promise<Business> {

  const response = await fetch(
    `${API_BASE_URL}/businesses/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(business),
    }
  );

  if (!response.ok) {
    const errorData = await response.json()
      .catch(() => null);

    throw new Error(
      errorData?.detail ||
      "Failed to create business."
    );
  }

  return response.json();
}