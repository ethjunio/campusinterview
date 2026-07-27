import { approveBookingsListApi } from "@/app/services/admin/bookings/approvedBooking";
import { useMutation } from "@tanstack/react-query";

export const useApproveBookingsListMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["useApproveBookingsList"],
    mutationFn: approveBookingsListApi,
    ...options, // You can pass success or error handlers here
  });

  return mutation;
};
