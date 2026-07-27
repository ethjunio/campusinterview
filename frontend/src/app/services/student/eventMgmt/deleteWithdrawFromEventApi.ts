import { axiosInstance } from "@/utils/axios";

export const deleteWithdrawFromEventApi = async (data: { preeventId: number }): Promise<any> => {
    const response = await axiosInstance.delete(
      `/student/eventMgmt/withdrawFromPreevent`,
      {
        data, 
      }
    );
  
    return response.data;
  };