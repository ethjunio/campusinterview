import { axiosInstance } from "@/utils/axios";

export const getBookingBookingsDataApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/bookingMgmt/getBookingList"
  );
  return response.data;
};
