import { axiosInstance } from "@/utils/axios";

export const createInterviewPublishApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/admin/interviews/publish", data);
  return response.data;  
};
