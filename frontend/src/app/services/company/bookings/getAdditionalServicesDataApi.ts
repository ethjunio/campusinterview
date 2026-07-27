import { axiosInstance } from "@/utils/axios";

export const getAdditionalServicesDataApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/bookingMgmt/getAdditionalServices"
  );
  return response.data;
};
