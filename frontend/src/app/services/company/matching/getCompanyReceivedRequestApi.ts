import { axiosInstance } from "@/utils/axios";

export const getCompanyReceivedRequestApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/matchMgmt/getMatchList/received"
  );
  return response.data;
};
