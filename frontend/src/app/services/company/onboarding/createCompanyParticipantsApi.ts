import { axiosInstance } from "@/utils/axios";

export const createCompanyParticipantsApi = async (data: any): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      "/company/onboarding-participants",
      data
    );
    return response.data;
  } catch (error: any) {
    // Log the error or handle it as needed
    console.log(
      "Error creating company participants:",
      error?.response?.data?.error
    );
    throw error;
  }
};
