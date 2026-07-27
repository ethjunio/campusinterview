import { createCompanyGeneralDataAPi } from "@/app/services/company/onboarding/createCompanyGeneralDataAPi";
import { useMutation } from "@tanstack/react-query";

export const useCreateCompanyGeneralDataMutation
 = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createCompanyGeneralData"],
    mutationFn: createCompanyGeneralDataAPi,
    ...options,
  });

  return mutation;
};
