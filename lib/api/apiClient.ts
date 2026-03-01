import axios, { AxiosRequestConfig, AxiosError } from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export const IMAGE_BASE_URL = "https://api.spodia.com"

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout
});

// Add server-side logging interceptors for debugging
apiClient.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    console.log(`\n🚀 [SERVER API REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
    if (config.params) console.log("   Params:", JSON.stringify(config.params));
    if (config.data) console.log("   Data:", JSON.stringify(config.data));
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (typeof window === "undefined") {
      console.log(`✅ [SERVER API RESPONSE] ${response.status} ${response.config.url}`);
      // Log simple summary or length to avoid cluttering console
      const dataStr = JSON.stringify(response.data);
      console.log(`   Data length: ${dataStr.length} chars`);
      if (dataStr.length < 500) console.log("   Data:", dataStr);
    }
    return response;
  },
  (error) => {
    if (typeof window === "undefined") {
      console.error(`❌ [SERVER API ERROR] ${error.config?.url}`, error.response?.status, error.message);
      if (error.response?.data) {
          console.error("   Error Data:", JSON.stringify(error.response.data));
      }
    }
    return Promise.reject(error);
  }
);

// Attach token if available
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("spodia_access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Error handler helper
const handleApiError = (error: any, endpoint: string): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    // Network error
    if (!axiosError.response) {
      console.error(`Network error for ${endpoint}:`, axiosError.message);
      throw new ApiError(
        "Network error. Please check your internet connection.",
        0,
        null
      );
    }
    
    // HTTP error
    const statusCode = axiosError.response.status;
    const responseData = axiosError.response.data as any;
    
    let errorMessage = "An error occurred. Please try again.";
    
    // Extract error message from response
    if (responseData?.message) {
      errorMessage = responseData.message;
    } else if (responseData?.error) {
      errorMessage = responseData.error;
    } else if (responseData?.detail) {
      errorMessage = responseData.detail;
    }
    
    // Handle specific status codes
    switch (statusCode) {
      case 400:
        errorMessage = responseData?.message || "Invalid request. Please check your input.";
        break;
      case 401:
        errorMessage = "Unauthorized. Please login again.";
        break;
      case 403:
        errorMessage = "Access denied. You don't have permission.";
        break;
      case 404:
        errorMessage = "Resource not found.";
        break;
      case 422:
        errorMessage = responseData?.message || "Validation error. Please check your input.";
        break;
      case 429:
        errorMessage = "Too many requests. Please try again later.";
        break;
      case 500:
        errorMessage = "Server error. Please try again later.";
        break;
      case 503:
        errorMessage = "Service unavailable. Please try again later.";
        break;
    }
    
    console.error(`API Error [${statusCode}] for ${endpoint}:`, errorMessage);
    throw new ApiError(errorMessage, statusCode, responseData);
  }
  
  // Unknown error
  console.error(`Unknown error for ${endpoint}:`, error);
  throw new ApiError(
    error?.message || "An unexpected error occurred.",
    undefined,
    error
  );
};

// Helper for authenticated GET requests
export const authenticatedGet = async (endpoint: string, config?: AxiosRequestConfig) => {
  try {
    const response = await apiClient.get(endpoint, config);
    return response;
  } catch (error) {
    return handleApiError(error, `GET ${endpoint}`);
  }
};

// Helper for authenticated POST requests
export const authenticatedPost = async (endpoint: string, data?: any, config?: AxiosRequestConfig) => {
  try {
    const response = await apiClient.post(endpoint, data, config);
    return response;
  } catch (error) {
    return handleApiError(error, `POST ${endpoint}`);
  }
};

// Helper for authenticated PUT requests
export const authenticatedPut = async (endpoint: string, data?: any, config?: AxiosRequestConfig) => {
  try {
    const response = await apiClient.put(endpoint, data, config);
    return response;
  } catch (error) {
    return handleApiError(error, `PUT ${endpoint}`);
  }
};

// Helper for authenticated DELETE requests
export const authenticatedDelete = async (endpoint: string, config?: AxiosRequestConfig) => {
  try {
    const response = await apiClient.delete(endpoint, config);
    return response;
  } catch (error) {
    return handleApiError(error, `DELETE ${endpoint}`);
  }
};

export default apiClient;

// Import token refresh after apiClient is created to avoid circular dependency
if (typeof window !== "undefined") {
  // import("@/lib/auth/tokenRefresh")
}
