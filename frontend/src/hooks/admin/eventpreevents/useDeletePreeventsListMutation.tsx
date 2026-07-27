import { deletePreeventsListApi } from "@/app/services/admin/eventPreevents/deletePreeventsListApi";
import { useMutation } from "@tanstack/react-query";

export const useDeletePreeventsListMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["useDeleteCandidatesMutation"],
    mutationFn: deletePreeventsListApi,
    ...options,
  });

  return mutation;
};
