import { createCompanySendInterviewRequestApi } from "@/app/services/company/talent-pool/createCompanySendInterviewRequestApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateSendInterviewRequestMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createCompanySendInterviewRequest"],
    mutationFn: createCompanySendInterviewRequestApi,
    ...options,
  });

  return mutation;
};
