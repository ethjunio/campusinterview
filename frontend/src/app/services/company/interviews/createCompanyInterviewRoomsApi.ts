import { axiosInstance } from "@/utils/axios";

export const createCompanyInterviewRoomsApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/interviewMgmt/createCompanyInterviewRooms", data);
  return response.data;  
};
