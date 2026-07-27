import { axiosInstance } from "@/utils/axios";

export const getWaitingListMatchingApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/matchMgmt/getMatchList/waiting"
  );
  return response.data;
};
