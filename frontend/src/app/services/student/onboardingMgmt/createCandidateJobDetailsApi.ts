import { axiosInstance } from "@/utils/axios";

// Update the function to accept form data
export const createCandidateJobDetailsApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/onboardingMgmt/saveJobRequirementDetails", data);
  return response.data;  
};
