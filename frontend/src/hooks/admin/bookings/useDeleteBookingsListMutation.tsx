import { deleteBookingsListApi } from "@/app/services/admin/bookings/deleteBookingsListApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBookingsListMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["useDeleteBookingsListMutation"],
    mutationFn: deleteBookingsListApi,
    ...options,
  });

  return mutation;
};
