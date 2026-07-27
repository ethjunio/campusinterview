import { axiosInstance } from "@/utils/axios";

export const getPreeventsListByIdApi = async (id: any): Promise<any> => {
    console.log("id here",id)
  const response = await axiosInstance.get(
    `/admin/company-preevent/participants/${id}`
  );
  console.log("data here", response.data)
  return response.data;
};
