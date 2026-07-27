import { axiosInstance } from "@/utils/axios";

export const createServiceBookingApi = async (
  data: any
): Promise<any> => {
  const response = await axiosInstance.post("/company/bookingMgmt/createCompanyBooking", data);
  return response.data;  
};
