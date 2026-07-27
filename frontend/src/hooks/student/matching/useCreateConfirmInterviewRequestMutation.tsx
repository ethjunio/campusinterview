import { createConfirmInterviewRequestApi } from "@/app/services/student/matching/createConfirmInterviewRequestApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateConfirmInterviewRequestMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createConfirmInterviewRequest"],
    mutationFn: createConfirmInterviewRequestApi,
    ...options,
  });

  return mutation;
};
