import { axiosInstance } from "@/utils/axios";

export const getLanguageLevelDropdownApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/profileMgmt/getLanguageLevelsDropdown"
  );
  return response.data;
};
