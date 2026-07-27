import { updateCandidateExperienceAPI } from "@/app/services/student/profilemgmt/updateCandidateExperience";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCandidateExperienceMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["updateCandidateExperience"],
    mutationFn: async (variables: { id: number; data: any }) => {
      return updateCandidateExperienceAPI(variables.id, variables.data);
    },
    ...options,
  });

  return mutation;
};
