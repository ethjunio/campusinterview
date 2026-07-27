import { axiosInstance } from "@/utils/axios";

export const createSendWaitingListRequestApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/interviewMgmt/sendInterviewRequest/waitingList", data);
  return response.data;  
};
