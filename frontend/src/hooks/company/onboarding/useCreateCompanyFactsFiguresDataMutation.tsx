import { createCompanyFactsFiguresDataApi } from "@/app/services/company/onboarding/createCompanyFactsFiguresDataApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateCompanyFactsFiguresDataMutation
 = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createCompanyFactsFiguresData"],
    mutationFn: createCompanyFactsFiguresDataApi,
    ...options,
  });

  return mutation;
};
