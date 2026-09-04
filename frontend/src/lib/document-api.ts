import { API_BASE_URL } from "@/lib/api";

import {
  BusinessDocument,
  DocumentReadiness,
  DocumentStatus,
} from "@/lib/document";


export interface CreateDocumentPayload {
  business_id: string;
  requirement_code: string;
  document_name: string;
  document_type?: string;
}


export async function getBusinessDocuments(
  businessId: string
): Promise<BusinessDocument[]> {

  const response = await fetch(
    `${API_BASE_URL}/documents/business/${businessId}`
  );

  if (!response.ok) {

    throw new Error(
      "Unable to load documents."
    );

  }

  return response.json();

}


export async function createDocument(
  payload: CreateDocumentPayload
): Promise<BusinessDocument> {

  const response = await fetch(
    `${API_BASE_URL}/documents/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {

    throw new Error(
      "Unable to create document."
    );

  }

  return response.json();

}


export async function updateDocumentStatus(
  documentId: string,
  status: DocumentStatus
): Promise<BusinessDocument> {

  const response = await fetch(
    `${API_BASE_URL}/documents/${documentId}/status`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        status,
      }),
    }
  );

  if (!response.ok) {

    throw new Error(
      "Unable to update document status."
    );

  }

  return response.json();

}


export async function deleteDocument(
  documentId: string
): Promise<void> {

  const response = await fetch(
    `${API_BASE_URL}/documents/${documentId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {

    throw new Error(
      "Unable to delete document."
    );

  }

}


export async function getDocumentReadiness(
  businessId: string
): Promise<DocumentReadiness> {

  const response = await fetch(
    `${API_BASE_URL}/documents/business/${businessId}/readiness`
  );

  if (!response.ok) {

    throw new Error(
      "Unable to load application readiness."
    );

  }

  return response.json();

}