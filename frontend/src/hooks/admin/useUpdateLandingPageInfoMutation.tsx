import { updateLandingPageInfoAPI } from "@/app/services/admin/updateLandingPageInfoApi";
import { useMutation } from "@tanstack/react-query";

export const useUpdateLandingPageInfoMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["updateLandingPageInfoMutation"],
    mutationFn: updateLandingPageInfoAPI,
    ...options,
  });

  return mutation;
};
