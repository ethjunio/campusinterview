import { axiosInstance } from "@/utils/axios";

export const createSaveMatchInterviewSlotApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/interviewMgmt/saveMatchInterviewSlot", data);
  return response.data;  
};
