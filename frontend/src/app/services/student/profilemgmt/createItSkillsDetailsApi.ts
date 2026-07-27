import { axiosInstance } from "@/utils/axios";

// Update the function to accept form data
export const createItSkillsDetailsApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/profileMgmt/saveCandidateSkill/skill", data);
  return response.data;  
};
