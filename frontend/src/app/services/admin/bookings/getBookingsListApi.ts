import { axiosInstance } from "@/utils/axios";

export const getBookingsListApi = async (searchTerm?: string): Promise<any> => {
  const response = await axiosInstance.get(
    `/admin/bookingMgmt/getBookings${
      searchTerm ? `?companyId=${searchTerm}` : ""
    }`
  );
  return response.data;
};

export const getBookingsDropdownListAPI = async (): Promise<any> => {
  const response = await axiosInstance.get(
    "/admin/bookingMgmt/getCompanyNamesDropdown"
  );
  return response.data;
};
