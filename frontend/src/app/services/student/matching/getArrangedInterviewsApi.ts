import { axiosInstance } from "@/utils/axios";

export const getArrangedInterviewsApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/matchMgmt/getMatchList/arranged"
  );
  return response.data;
};
