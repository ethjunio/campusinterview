import { axiosInstance } from "@/utils/axios";

export const getSkillsLevelDropdownApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/profileMgmt/getSkillLevelsDropdown"
  );
  return response.data;
};
