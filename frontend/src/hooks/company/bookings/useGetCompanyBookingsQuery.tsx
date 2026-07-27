import { useQuery } from "@tanstack/react-query";
import { getBookingBookingsDataApi } from "@/app/services/company/bookings/getBookingBookingsDataApi";

export const useGetCompanyBookingsQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getBookingBookingsData"],
      queryFn: () => getBookingBookingsDataApi(),
      ...options,
    });
  };
  