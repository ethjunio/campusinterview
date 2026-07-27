import { axiosInstance } from "@/utils/axios";

export const getPreEventDetailApi = async (id: any): Promise<any> => {
  const response = await axiosInstance.get(
    `/company/eventMgmt/getPreeventDetail`,
    {
      params: {
        preeventId: id
      }
    }
  );
  return response.data;
};