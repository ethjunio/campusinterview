import { createCandidateExperienceApi } from "@/app/services/student/profilemgmt/createCandidateExperienceApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateCandidateExperienceMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createCandidateExperience"],
    mutationFn: createCandidateExperienceApi,
    ...options,
  });

  return mutation;
};
