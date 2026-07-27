import { createServiceBookingApi } from "@/app/services/company/bookings/createServiceBookingApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateServiceBookingMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createServiceBooking"],
    mutationFn: createServiceBookingApi,
    ...options,
  });

  return mutation;
};
