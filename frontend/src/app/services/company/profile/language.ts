import { axiosInstance } from "@/utils/axios";

export const getLanguageDropdown = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/contact-languages-dropdown"
  );
  return response.data.data;
};
