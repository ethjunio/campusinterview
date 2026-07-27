import { axiosInstance } from "@/utils/axios";

export const getReceivedRequestMatchingApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/matchMgmt/getMatchList/received"
  );
  return response.data;
};
