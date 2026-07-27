import { updateFaqsBoxDataAPI } from "@/app/services/admin/updateFaqsBoxDataApi";
import { updateInfoBoxDataAPI } from "@/app/services/admin/updateInformationBoardApi";
import { useMutation } from "@tanstack/react-query";

export const useUpdateFaqsBoxDataMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["updateFaqsBoxDataMutation"],
    mutationFn: updateFaqsBoxDataAPI,
    ...options,
  });

  return mutation;
};
