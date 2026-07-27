import { axiosInstance } from "@/utils/axios";

export const getRoomTypesDataApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/bookingMgmt/getRoomTypes"
  );
  return response.data;
};
