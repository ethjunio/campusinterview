import { useMutation } from "@tanstack/react-query";
import { deleteCandidateExperienceByIdApi } from "@/app/services/student/profilemgmt/deleteCandidateExperienceByIdApi";

export const useDeleteCandidateExperienceByIdMutation = (options = {}) => {
    const mutation = useMutation({
      mutationKey: ["deleteCandidateExperienceById"],
      mutationFn: deleteCandidateExperienceByIdApi,
      ...options,
    });
  
    return mutation;
  };