export type DocumentStatus =
  | "MISSING"
  | "UPLOADED"
  | "UNDER_CHECK"
  | "READY";


export type BusinessDocument = {
  id: string;

  business_id: string;

  requirement_code: string;

  document_name: string;

  document_type?: string | null;

  status: DocumentStatus;

  file_id?: string | null;

  original_filename?: string | null;

  content_type?: string | null;

  file_size?: number | null;
};


export type DocumentReadiness = {
  business_id: string;

  total_documents: number;

  completed_documents: number;

  missing_documents: number;

  readiness_percentage: number;
};