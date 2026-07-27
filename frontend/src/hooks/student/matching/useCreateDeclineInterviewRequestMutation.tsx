import { createDeclineInterviewRequestApi } from "@/app/services/student/matching/createDeclineInterviewRequestApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateDeclineInterviewRequestMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createDeclineInterviewRequest"],
    mutationFn: createDeclineInterviewRequestApi,
    ...options,
  });

  return mutation;
};
