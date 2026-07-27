import { axiosInstance } from "@/utils/axios";

export const adminCreateInterviewsApi = async (data: any): Promise<any> => {
  const response = await axiosInstance.post("/admin/create-interviews", data);
  return response.data;
};
export const adminUpdateInterviewsApi = async (data: any): Promise<any> => {
  const response = await axiosInstance.post(
    "/admin/import-interviews-timeslot",
    data,
  );
  return response.data;
};
