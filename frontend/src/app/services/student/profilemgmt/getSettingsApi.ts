import { axiosInstance } from "@/utils/axios";

export const getSettingsApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/profileMgmt/getCandidateSettings"
  );
  return response.data;
};
