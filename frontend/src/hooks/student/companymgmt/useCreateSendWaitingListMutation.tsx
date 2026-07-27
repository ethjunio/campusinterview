import { createSendWaitingListRequestApi } from "@/app/services/student/companyMgmt/createSendWaitingListRequestApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateSendWaitingListMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createSendWaitingListRequest"],
    mutationFn: createSendWaitingListRequestApi,
    ...options,
  });

  return mutation;
};
