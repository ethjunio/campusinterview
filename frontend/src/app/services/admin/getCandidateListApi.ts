import { axiosInstance } from "@/utils/axios";

export const getCandidateListAPI = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/admin/candidateMgmt/getCandidatesWithEmail"
  );
  return response.data;
};
