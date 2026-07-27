import { updateStatusCandidateAPI } from "@/app/services/admin/updateStatusCandiateApi";
import { useMutation } from "@tanstack/react-query";

export const useStatusCandidateMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["statusCandidateMutation"],
    mutationFn: updateStatusCandidateAPI,
    ...options,
  });

  return mutation;
};
