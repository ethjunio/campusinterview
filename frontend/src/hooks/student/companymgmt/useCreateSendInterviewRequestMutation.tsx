import { createSendInterviewRequestApi } from "@/app/services/student/companyMgmt/createSendInterviewRequestApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateSendInterviewRequestMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createSendInterviewRequest"],
    mutationFn: createSendInterviewRequestApi,
    ...options,
  });

  return mutation;
};
