import { axiosInstance } from "@/utils/axios";

export const useGetThesisDropdownApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/profileMgmt/getThesisDropdown"
  );
  return response.data;
};
