import { axiosInstance } from "@/utils/axios";

export const getPositionDropdownApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/profileMgmt/getExperiencePositionDropdown"
  );
  return response.data;
};
