import { axiosInstance } from "@/utils/axios";

export const getPreeventsListApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/admin/company-preevent/get"
  );
  return response.data;
};
