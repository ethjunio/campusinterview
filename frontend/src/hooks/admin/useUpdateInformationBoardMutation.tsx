import { updateInfoBoxDataAPI } from "@/app/services/admin/updateInformationBoardApi";
import { useMutation } from "@tanstack/react-query";

export const useUpdateInfoBoxDataMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["updateInfoBoxDataMutation"],
    mutationFn: updateInfoBoxDataAPI,
    ...options,
  });

  return mutation;
};
