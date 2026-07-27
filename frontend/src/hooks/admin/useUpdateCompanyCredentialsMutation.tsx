import { updateCompanyCredentialsAPI } from "@/app/services/admin/updateCompanyCredentialsApi";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCompanyCredentialsMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["updateCompanyCredentialsMutation"],
    mutationFn: updateCompanyCredentialsAPI,
    ...options,
  });

  return mutation;
};
