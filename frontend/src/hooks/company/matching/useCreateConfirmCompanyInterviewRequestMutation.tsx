import { createConfirmCompanyInterviewRequestApi } from "@/app/services/company/matching/createConfirmCompanyInterviewRequestApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateConfirmCompanyInterviewRequestMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createConfirmCompanyInterviewRequest"],
    mutationFn: createConfirmCompanyInterviewRequestApi,
    ...options,
  });

  return mutation;
};
