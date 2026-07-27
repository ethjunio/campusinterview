import { axiosInstance } from "@/utils/axios";

export const getThingsAboutMeApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/profileMgmt/getCandidateInfos/info"
  );
  return response.data;
};
