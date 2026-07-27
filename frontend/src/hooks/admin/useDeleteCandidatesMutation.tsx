import { deleteCandidatesApi } from "@/app/services/admin/deleteCandidatesApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCandidatesMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["useDeleteCandidatesMutation"],
    mutationFn: deleteCandidatesApi,
    ...options,
  });

  return mutation;
};
