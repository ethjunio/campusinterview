import { createLanguageDetailsApi } from "@/app/services/student/profilemgmt/createLanguageDetailsApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateLanguageDetailsMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createLanguageDetails"],
    mutationFn: createLanguageDetailsApi,
    ...options,
  });

  return mutation;
};
