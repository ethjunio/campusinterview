import { axiosInstance } from "@/utils/axios";

export const getDeclinedRequestsMatchingApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/matchMgmt/getMatchList/declined"
  );
  return response.data;
};
