import { createCompanySendWaitingRequestApi } from "@/app/services/company/talent-pool/createCompanySendWaitingRequestApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateSendWaitingRequestMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createCompanySendWaitingRequest"],
    mutationFn: createCompanySendWaitingRequestApi,
    ...options,
  });

  return mutation;
};
