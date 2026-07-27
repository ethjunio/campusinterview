import { updateCandidateEducationAPI } from "@/app/services/student/profilemgmt/updateCandidateEducation";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCandidateEducationMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["updateCandidateEducation"],
    mutationFn: async (variables: { id: number; data: any }) => {
      return updateCandidateEducationAPI(variables.id, variables.data);
    },
    ...options,
  });

  return mutation;
};
