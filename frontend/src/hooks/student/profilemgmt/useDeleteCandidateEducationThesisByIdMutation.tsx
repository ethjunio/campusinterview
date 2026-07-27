import { useMutation } from "@tanstack/react-query";
import { deleteCandidateEducationThesisByIdApi } from "@/app/services/student/profilemgmt/deleteCandidateEducationThesisByIdApi";

export const useDeleteCandidateEducationThesisByIdMutation = (options = {}) => {
    const mutation = useMutation({
      mutationKey: ["deleteCandidateEducationThesisById"],
      mutationFn: deleteCandidateEducationThesisByIdApi,
      ...options,
    });
  
    return mutation;
  };