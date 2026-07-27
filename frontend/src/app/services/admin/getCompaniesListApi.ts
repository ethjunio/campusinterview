import { axiosInstance } from "@/utils/axios";

export const getCompaniesListAPI = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/admin/companyMgmt/getCompaniesWithUser"
  );
  return response.data;
};
