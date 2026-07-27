import { axiosInstance } from "@/utils/axios";

export const getCandidateLanguageApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/profileMgmt/getCandidateLanguages/language"
  );
  return response.data;
};
