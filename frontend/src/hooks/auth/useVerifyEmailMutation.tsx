import { useMutation } from "@tanstack/react-query";
import { verifyEmailAPI } from "@/app/services/auth/authApi";

export const useVerifyEmailMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["verifyEmailAPI"],
    mutationFn: verifyEmailAPI,
    ...options,
  });

  return mutation;
};