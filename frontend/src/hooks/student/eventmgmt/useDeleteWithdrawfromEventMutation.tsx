import { deleteWithdrawFromEventApi } from "@/app/services/student/eventMgmt/deleteWithdrawFromEventApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteWithdrawfromEventMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["deleteWithdrawFromEvent"],
    mutationFn: deleteWithdrawFromEventApi,
    ...options,
  });

  return mutation;
};
