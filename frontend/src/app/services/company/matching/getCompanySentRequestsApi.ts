import { axiosInstance } from "@/utils/axios";

export const getCompanySentRequestsApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/matchMgmt/getMatchList/sent"
  );
  return response.data;
};
