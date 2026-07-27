import { axiosInstance } from "@/utils/axios";

export const getBookingSummaryDetailsApi = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/company/bookingMgmt/getLastBookingDetailsCompany"
  );
  return response?.data;
};
       