import { axiosInstance } from "@/utils/axios";

export const createDeclineCompanyInterviewApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/interviewMgmt/declineInterviewRequest", data);
  return response.data;  
};
