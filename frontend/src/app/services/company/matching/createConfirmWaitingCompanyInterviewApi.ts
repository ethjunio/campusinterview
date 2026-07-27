import { axiosInstance } from "@/utils/axios";

export const createConfirmWaitingCompanyInterviewApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/interviewMgmt/confirmWaitingListRequest", data);
  return response.data;  
};
