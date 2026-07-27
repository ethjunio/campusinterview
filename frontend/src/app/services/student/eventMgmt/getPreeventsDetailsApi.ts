import { axiosInstance } from "@/utils/axios";

export const getPreeventsDetailsApi = async (id: any): Promise<any> => {
  const response = await axiosInstance.get(
    `/student/eventMgmt/getPreeventDetail/${id}`
  );
  return response.data;
};
