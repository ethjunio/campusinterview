import { useMutation } from "@tanstack/react-query";
import { deleteCandidateEducationApi } from "@/app/services/student/profilemgmt/deleteCandidateEducationApi";

export const useDeleteCandidateEducationMutation = (options = {}) => {
    const mutation = useMutation({
      mutationKey: ["deleteCandidateEducation"],
      mutationFn: deleteCandidateEducationApi,
      ...options,
    });
  
    return mutation;
  };