import { axiosInstance } from "@/utils/axios";

export const createCompanySendWaitingRequestApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/interviewMgmt/sendInterviewRequest/waitingList", data);
  return response.data;  
};
