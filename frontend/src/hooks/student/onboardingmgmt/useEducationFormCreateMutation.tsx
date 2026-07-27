import { createEducationDetailsApi } from "@/app/services/student/onboardingMgmt/createEducationDetailsApi";
import { useMutation } from "@tanstack/react-query";

export const useEducationFormCreateMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createEducationDetails"],
    mutationFn: createEducationDetailsApi,
    ...options,
  });

  return mutation;
};
