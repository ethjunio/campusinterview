import { axiosInstance } from "@/utils/axios";

export const createDeclineInterviewRequestApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/interviewMgmt/declineInterviewRequest", data);
  return response.data;  
};
