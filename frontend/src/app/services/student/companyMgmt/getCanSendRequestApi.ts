import { axiosInstance } from "@/utils/axios";

export const getCanSendRequestApi = async (id:any): Promise<any> => {
  const response = await axiosInstance.get(
    `/student/interviewMgmt/canSendRequest/${id}`
  );
  return response.data;
};
