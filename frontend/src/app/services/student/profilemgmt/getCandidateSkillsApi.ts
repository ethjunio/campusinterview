import { axiosInstance } from "@/utils/axios";

export const getCandidateSkillsApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/profileMgmt/getCandidateSkills/skill"
  );
  return response.data;
};
