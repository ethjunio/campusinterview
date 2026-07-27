import { axiosInstance } from "@/utils/axios";

export const getCompanyDetailsByIdApi = async (id: any): Promise<any> => {
  const response = await axiosInstance.get(
    `/student/companyMgmt/getCompanyDetails/${id}`
  );
  return response.data;
};
