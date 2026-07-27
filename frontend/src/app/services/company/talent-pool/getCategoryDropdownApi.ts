import { axiosInstance } from "@/utils/axios";

export const getCategoryDropdownApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/talentPoolMgmt/getCategoryDropdown?search="
  );
  return response.data;
};
