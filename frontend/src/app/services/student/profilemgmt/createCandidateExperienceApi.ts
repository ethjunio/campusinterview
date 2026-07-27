import { axiosInstance } from "@/utils/axios";

// Update the function to accept form data
export const createCandidateExperienceApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/profileMgmt/addCandidateExperience", data);
  return response.data;  
};
