import { deleteCandidatesApi } from "@/app/services/admin/deleteCandidatesApi";
import { deleteFaqsApi } from "@/app/services/admin/deleteFaqsApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteFaqsMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["useDeleteFaqsMutation"],
    mutationFn: deleteFaqsApi,
    ...options,
  });

  return mutation;
};
