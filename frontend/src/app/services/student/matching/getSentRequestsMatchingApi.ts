import { axiosInstance } from "@/utils/axios";

export const getSentRequestsMatchingApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/matchMgmt/getMatchList/sent"
  );
  return response.data;
};
