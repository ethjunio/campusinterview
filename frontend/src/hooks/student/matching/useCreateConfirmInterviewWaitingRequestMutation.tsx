import { createConfirmWaitingInterviewRequestApi } from "@/app/services/student/matching/createConfirmWaitingInterviewRequestApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateConfirmInterviewWaitingRequestMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createConfirmWaitingInterviewRequest"],
    mutationFn: createConfirmWaitingInterviewRequestApi,
    ...options,
  });

  return mutation;
};
