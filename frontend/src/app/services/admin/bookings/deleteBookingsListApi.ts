import { axiosInstance } from "@/utils/axios";
import { DeleteBookingsListCredentials } from "@/app/types";

export const deleteBookingsListApi = async (
  credentials: DeleteBookingsListCredentials
) => {
  const { id } = credentials;

  const response = await axiosInstance.delete(
    `/admin/bookingMgmt/deleteBooking/${id}`
  );
  return response.data;
};
