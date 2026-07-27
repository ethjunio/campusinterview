import { useQuery } from "@tanstack/react-query";
import { getBookingSummaryDetailsApi } from "@/app/services/company/bookings/getBookingSummaryDetailsApi";
import { BookingData } from "@/app/company/(layoutwrapper)/profile/(layoutforms)/bookings/summary/_components/BookingSummary";

export const useBookingSummaryDetailsQuery = (options: any = {}) => {
    return useQuery<{ data: BookingData }>({
      queryKey: ["getBookingSummaryDetails"],
      queryFn: () => getBookingSummaryDetailsApi(),
      ...options,
    });
  };
  