import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME, clearPersistedAuthSession } from "@/utils/authSession";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

function isAuthEndpoint(url?: string): boolean {
  return Boolean(url?.includes("/auth/"));
}

function resetClientAuthState(): void {
  clearPersistedAuthSession();
  void import("@/app/store/authStore").then(({ default: useAuthStore }) => {
    useAuthStore.setState({ user: null, isLoading: false, error: null });
  });
}

function handleUnauthorizedResponse(url?: string): void {
  if (isAuthEndpoint(url)) {
    return;
  }

  resetClientAuthState();

  if (
    typeof window !== "undefined" &&
    !window.location.pathname.includes("/login")
  ) {
    window.location.href = "/login";
  }
}

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      handleUnauthorizedResponse(error.config?.url);
    }
    return Promise.reject(error);
  }
);

export const axiosInstanceFormData = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosInstanceFormData.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axiosInstanceFormData.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      handleUnauthorizedResponse(error.config?.url);
    }
    return Promise.reject(error);
  }
);
