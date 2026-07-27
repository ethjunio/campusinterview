import { axiosInstance } from "@/utils/axios";

export const createConfirmCompanyInterviewRequestApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/interviewMgmt/confirmInterviewRequest", data);
  return response.data;  
};
