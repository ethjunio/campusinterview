import { useQuery } from "@tanstack/react-query";
import { getBookingApi } from "@/app/services/company/profile/booking";

export const useGetBookingQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getBooking"],
    queryFn: () => getBookingApi(),
    ...options,
  });
};
