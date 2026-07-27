import { axiosInstance } from "@/utils/axios";

export const createConfirmInterviewRequestApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/interviewMgmt/confirmInterviewRequest", data);
  return response.data;  
};
