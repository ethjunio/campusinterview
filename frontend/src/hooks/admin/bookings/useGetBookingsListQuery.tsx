import {
  getBookingsDropdownListAPI,
  getBookingsListApi,
} from "@/app/services/admin/bookings/getBookingsListApi";
import { useQuery } from "@tanstack/react-query";

export const useGetBookingsListQuery = (options: any = {}, id: string) => {
  return useQuery<{ data: any }>({
    queryKey: ["bookingsList", id],
    queryFn: () => getBookingsListApi(id),
    ...options,
  });
};

export const useGetBookingsDropdownListQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["bookingsDropdownList"],
    queryFn: () => getBookingsDropdownListAPI(),
    ...options,
  });
};
