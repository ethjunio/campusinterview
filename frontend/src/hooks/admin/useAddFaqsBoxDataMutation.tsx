
import { addFaqsBoxDataAPI } from "@/app/services/admin/addFaqsBoxDataApi";
import { updateInfoBoxDataAPI } from "@/app/services/admin/updateInformationBoardApi";
import { useMutation } from "@tanstack/react-query";

export const useAddFaqsBoxDataMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["addFaqsBoxDataMutation"],
    mutationFn: addFaqsBoxDataAPI,
    ...options,
  });

  return mutation;
};
