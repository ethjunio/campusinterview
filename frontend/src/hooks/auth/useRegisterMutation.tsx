import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "@/app/services/auth/authApi";

export const useRegisterMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["registerAPI"],
    mutationFn: registerAPI,
    ...options,
  });

  return mutation;
};