import { deleteUserRetainsionApi } from "@/app/services/admin/deleteUserRetainsionApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUserRetaintionMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["useDeleteUserRetaintionMutation"],
    mutationFn: deleteUserRetainsionApi,
    ...options,
  });

  return mutation;
};
