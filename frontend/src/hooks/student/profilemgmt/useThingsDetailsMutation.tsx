import { creatThingsAboutdetailsApi } from "@/app/services/student/profilemgmt/createThingsAboutMeApi";
import { useMutation } from "@tanstack/react-query";

export const useThingsDetailsMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["creatThingsAboutdetails"],
    mutationFn: creatThingsAboutdetailsApi,
    ...options,
  });

  return mutation;
};
