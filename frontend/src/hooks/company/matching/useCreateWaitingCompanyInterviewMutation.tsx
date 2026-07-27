import { createConfirmWaitingCompanyInterviewApi } from "@/app/services/company/matching/createConfirmWaitingCompanyInterviewApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateWaitingCompanyInterviewMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createConfirmWaitingCompanyInterview"],
    mutationFn: createConfirmWaitingCompanyInterviewApi,
    ...options,
  });

  return mutation;
};
