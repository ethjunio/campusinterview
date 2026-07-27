import { createCandidateVisitApi } from "@/app/services/company/talent-pool/createCandidateVisitApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateCandidateSaveMutation
 = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createCandidateVisit"],
    mutationFn: createCandidateVisitApi,
    ...options,
  });

  return mutation;
};
