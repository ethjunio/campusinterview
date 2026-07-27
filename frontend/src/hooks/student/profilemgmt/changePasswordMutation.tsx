import { changePasswordApi } from "@/app/services/student/profilemgmt/changePasswordApi";
import { useMutation } from "@tanstack/react-query";

export const useChangePasswordMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: changePasswordApi,
    ...options,
  });

  return mutation;
};
