import { axiosInstance } from "@/utils/axios";

export const createParticipateInEventApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/student/eventMgmt/participateInPreevent", data);
  return response.data;  
};
