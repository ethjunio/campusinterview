import { createDeclineCompanyInterviewApi } from "@/app/services/company/matching/createDeclineCompanyInterviewApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateCompanyDeclineInterviewMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createDeclineCompanyInterview"],
    mutationFn: createDeclineCompanyInterviewApi,
    ...options,
  });

  return mutation;
};
