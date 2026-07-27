import { axiosInstance } from "@/utils/axios";

export const getLanguageDropdownApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/profileMgmt/getLanguagesDropdown"
  );
  return response.data;
};
