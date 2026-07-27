import { createCandidateJobDetailsApi } from "@/app/services/student/onboardingMgmt/createCandidateJobDetailsApi";
import { useMutation } from "@tanstack/react-query";

export const useCandidateJobFormCreateMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createCandidateJobDetails"],
    mutationFn: createCandidateJobDetailsApi,
    ...options,
  });

  return mutation;
};
