import { createsettingsApi } from "@/app/services/student/profilemgmt/createsettingsApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateSettingsMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createsettingsApi"],
    mutationFn: createsettingsApi,
    ...options,
  });

  return mutation;
};
