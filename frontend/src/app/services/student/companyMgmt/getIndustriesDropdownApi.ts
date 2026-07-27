import { axiosInstance } from "@/utils/axios";

export const getIndustriesDropdownApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/companyMgmt/getIndustriesDropdown"
  );
  return response.data;
};
