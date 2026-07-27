import { axiosInstance } from "@/utils/axios";

export const createCompanySendInterviewRequestApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/interviewMgmt/sendInterviewRequest/requested", data);
  return response.data;  
};
