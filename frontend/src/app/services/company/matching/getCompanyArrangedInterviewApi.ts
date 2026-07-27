import { axiosInstance } from "@/utils/axios";

export const getCompanyArrangedInterviewApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/matchMgmt/getMatchList/arranged"
  );
  return response.data;
};
