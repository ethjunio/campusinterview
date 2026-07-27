import { axiosInstance } from "@/utils/axios";

export const getSkillsDropdownApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/profileMgmt/getSkillsDropdown"
  );
  return response.data;
};
