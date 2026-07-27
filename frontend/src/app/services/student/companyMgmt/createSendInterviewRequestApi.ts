import { axiosInstance } from "@/utils/axios";

export const createSendInterviewRequestApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/interviewMgmt/sendInterviewRequest/requested", data);
  return response.data;  
};
