import { axiosInstance } from "@/utils/axios";

// Update the function to accept form data
export const createEducationDetailsApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/onboardingMgmt/saveEducationDetails", data);
  return response.data;  
};
