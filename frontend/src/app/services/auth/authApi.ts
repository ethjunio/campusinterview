import { axiosInstance } from "@/utils/axios";

// Define the types for the credentials and the response data

export interface RegisterCredentials {
  email: string;
  password: string;
  repeatPassword: string;
  type: string;
}


export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ForgotPasswordCredentials {
    email: string;
}

export interface ResetPasswordCredentials {
  newPassword: string;
  repeatNewPassword: string;
  verifyId: string;
}

export interface VerifyEmailCredentials {
  verifyId: string;
}



interface ApiResponse<T> {
  data: T;
}

// Function to register a user
export const registerAPI = async (credentials: RegisterCredentials): Promise<any> => {
  const response: ApiResponse<any> = await axiosInstance.post("/auth/register", credentials);
  return response.data;
};

// Function to login a user
export const loginAPI = async (credentials: LoginCredentials): Promise<any> => {
  const response: ApiResponse<any> = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

// Function to request a password reset
export const forgotPasswordAPI = async (credentials: ForgotPasswordCredentials): Promise<any> => {
    const response: ApiResponse<any> = await axiosInstance.post("/auth/forgotPassword", credentials); 
    return response.data;
  };

// Function to update a requested password reset
export const resetPasswordAPI = async (credentials: ResetPasswordCredentials): Promise<any> => {
  const response: ApiResponse<any> = await axiosInstance.post("/auth/resetPassword", credentials); 
  return response.data;
};

// Function to verify email
export const verifyEmailAPI = async (credentials: VerifyEmailCredentials): Promise<any> => {
  const response: ApiResponse<any> = await axiosInstance.post("/auth/verifyEmail", credentials); 
  return response.data;
};
  
  
