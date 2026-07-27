import { createCompanyContactDataApi } from "@/app/services/company/onboarding/createCompanyContactDataApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateCompanyContactDataMutation
 = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createCompanyContactData"],
    mutationFn: createCompanyContactDataApi,
    ...options,
  });

  return mutation;
};
