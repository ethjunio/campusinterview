import { createSaveMatchInterviewSlotApi } from "@/app/services/company/interviews/createSaveMatchInterviewSlotApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateSaveMatchInterviewSlotMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createSaveMatchInterviewSlot"],
    mutationFn: createSaveMatchInterviewSlotApi,
    ...options,
  });

  return mutation;
};
