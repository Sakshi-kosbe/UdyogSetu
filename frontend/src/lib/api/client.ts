import { API_BASE_URL } from "./config";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    }
  );

  if (!response.ok) {
    let message = "Something went wrong.";

    try {
      const errorData = await response.json();

      message =
        errorData.detail ||
        errorData.message ||
        message;
    } catch {
      message = response.statusText;
    }

    throw new Error(message);
  }

  return response.json();
}