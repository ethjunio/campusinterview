import { axiosInstance } from "@/utils/axios";

export const getEventsListByIdApi = async (id: any): Promise<any> => {
  const response = await axiosInstance.get(
    `/admin/company-preevent/get/${id}`
  );
  console.log("data here", response.data)
  return response.data;
};
