import { createextracurriculardetailsApi } from "@/app/services/student/profilemgmt/createextracurriculardetailsApi";
import { useMutation } from "@tanstack/react-query";

export const useExtraCurricularFormCreateMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createextracurriculardetails"],
    mutationFn: createextracurriculardetailsApi,
    ...options,
  });

  return mutation;
};
