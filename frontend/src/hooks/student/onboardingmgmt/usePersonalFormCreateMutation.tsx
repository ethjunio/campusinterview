import { createPersonalDetailsApi } from "@/app/services/student/onboardingMgmt/createPersonalDetailsApi";
import { useMutation } from "@tanstack/react-query";

export const usePersonalFormCreateMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createPersonalDetailsApi"],
    mutationFn: createPersonalDetailsApi,
    ...options,
  });

  return mutation;
};
