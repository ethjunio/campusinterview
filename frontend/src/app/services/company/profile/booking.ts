import { axiosInstance } from "@/utils/axios";

export const getBookingApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/bookingMgmt/getBookingList"
  );
  return response.data;
};

export const getRoomBookingTypeApi = async (): Promise<any> => {
  const response = await axiosInstance.get("/company/bookingMgmt/getRoomTypes");
  return response.data;
};

export const getAdditionalServicesApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/bookingMgmt/getAdditionalServices"
  );
  return response.data;
};
