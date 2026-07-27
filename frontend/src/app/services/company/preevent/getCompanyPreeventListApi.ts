import { axiosInstance } from "@/utils/axios";

export const getCompanyPreeventListApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    `/company/eventMgmt/getPreeventList`
  );
  return response.data;
};
