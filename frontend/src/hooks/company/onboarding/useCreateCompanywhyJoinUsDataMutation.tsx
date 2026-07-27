import { createCompanyWhyJoinUsApi } from "@/app/services/company/onboarding/createCompanyWhyJoinUsApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateCompanywhyJoinUsDataMutation
 = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createCompanyWhyJoinUs"],
    mutationFn: createCompanyWhyJoinUsApi,
    ...options,
  });

  return mutation;
};
