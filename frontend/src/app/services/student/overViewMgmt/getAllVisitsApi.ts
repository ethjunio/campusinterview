import { axiosInstance } from "@/utils/axios";

export const getAllVisitsApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/student/visits/getAllVisitsInLastDay"
  );
  return response.data;
};
