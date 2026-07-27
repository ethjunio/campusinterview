import { axiosInstance } from "@/utils/axios";

export const createNotifyParticipants = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/admin/interviews/notify-participants", data);
  return response.data;  
};
