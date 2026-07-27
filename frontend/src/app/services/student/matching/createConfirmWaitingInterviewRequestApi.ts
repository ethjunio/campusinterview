import { axiosInstance } from "@/utils/axios";

export const createConfirmWaitingInterviewRequestApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/interviewMgmt/confirmWaitingListRequest", data);
  return response.data;  
};
