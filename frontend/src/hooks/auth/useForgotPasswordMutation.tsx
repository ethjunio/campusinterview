import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAPI } from "@/app/services/auth/authApi";

export const useForgotPasswordMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["forgotPasswordAPI"],
    mutationFn: forgotPasswordAPI,
    ...options,
  });

  return mutation;
};