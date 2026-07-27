import { createOpenPosition } from "@/app/services/company/profile/openPosition";
import { useMutation } from "@tanstack/react-query";

export const useCreateOpenPositionMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createOpenPosition"],
    mutationFn: createOpenPosition,
    ...options,
  });

  return mutation;
};
