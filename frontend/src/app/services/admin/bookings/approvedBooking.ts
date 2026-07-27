import { axiosInstance } from "@/utils/axios";

export const approveBookingsListApi = async (id: string) => {
  const response = await axiosInstance.put(
    `/admin/bookingMgmt/approveBooking/${id}`
  );
  return response.data;
};
