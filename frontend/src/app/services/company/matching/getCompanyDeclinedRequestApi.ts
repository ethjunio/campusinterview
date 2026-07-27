import { axiosInstance } from "@/utils/axios";

export const getCompanyDeclinedRequestApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/matchMgmt/getMatchList/declined"
  );
  return response.data;
};
