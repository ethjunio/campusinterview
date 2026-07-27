import { axiosInstance } from "@/utils/axios";

export const getCandidateExperienceApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/profileMgmt/getCandidateExperienceDetails"
  );
  return response.data;
};
