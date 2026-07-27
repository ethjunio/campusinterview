import { createOpenPositions } from "@/app/services/company/profile/createOpenPositions";
import { useMutation } from "@tanstack/react-query";

export const useCreateOpenPositions
 = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createOpenPositions"],
    mutationFn: createOpenPositions,
    ...options,
  });

  return mutation;
};
