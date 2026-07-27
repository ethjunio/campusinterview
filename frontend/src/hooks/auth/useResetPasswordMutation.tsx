import { useMutation } from "@tanstack/react-query";
import { resetPasswordAPI } from "@/app/services/auth/authApi";

export const useResetPasswordMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["resetPasswordAPI"],
    mutationFn: resetPasswordAPI,
    ...options,
  });

  return mutation;
};