export interface Business {
  id: string;
  name: string;
  industry: string;
  business_size: string;
  location: string;
  activity: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessCreate {
  name: string;
  industry: string;
  business_size: string;
  location: string;
  activity: string;
}

export interface BusinessUpdate {
  name?: string;
  industry?: string;
  business_size?: string;
  location?: string;
  activity?: string;
}