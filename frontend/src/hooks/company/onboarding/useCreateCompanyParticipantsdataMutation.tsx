import { createCompanyParticipantsApi } from "@/app/services/company/onboarding/createCompanyParticipantsApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateCompanyParticipantsdataMutation
 = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createCompanyParticipantsApi"],
    mutationFn: createCompanyParticipantsApi,
    ...options,
  });

  return mutation;
};
