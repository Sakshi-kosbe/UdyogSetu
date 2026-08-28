import { API_BASE_URL } from "./api";
import {
  Business,
  BusinessCreate,
  BusinessUpdate,
} from "./business";

const BUSINESSES_URL = `${API_BASE_URL}/businesses`;

export async function getBusinesses(): Promise<Business[]> {
  const response = await fetch(`${BUSINESSES_URL}/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch businesses");
  }

  return response.json();
}

export async function getBusiness(
  businessId: string
): Promise<Business> {
  const response = await fetch(
    `${BUSINESSES_URL}/${businessId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch business");
  }

  return response.json();
}

export async function createBusiness(
  business: BusinessCreate
): Promise<Business> {
  const response = await fetch(`${BUSINESSES_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(business),
  });

  if (!response.ok) {
    throw new Error("Failed to create business");
  }

  return response.json();
}

export async function updateBusiness(
  businessId: string,
  business: BusinessUpdate
): Promise<Business> {
  const response = await fetch(
    `${BUSINESSES_URL}/${businessId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(business),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update business");
  }

  return response.json();
}

export async function deleteBusiness(
  businessId: string
): Promise<void> {
  const response = await fetch(
    `${BUSINESSES_URL}/${businessId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete business");
  }
}