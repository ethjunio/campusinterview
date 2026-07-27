import { axiosInstance } from "@/utils/axios";

export const getCompanyWaitingListApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/matchMgmt/getMatchList/waiting"
  );
  return response.data;
};
