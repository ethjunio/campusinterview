import { putCatagorizeCandidateApi } from "@/app/services/company/talent-pool/putCatagorizeCandidateApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateCandidateCategorizeMutation = (options = {}) => {
  return useMutation({
    mutationKey: ["putCatagorizeCandidate"],
    mutationFn: ({ id, data }: { id: string | number; data: any }) =>
      putCatagorizeCandidateApi(id, data),
    ...options,
  });
};
