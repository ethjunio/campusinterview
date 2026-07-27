import { updateStatusCompanyAPI } from "@/app/services/admin/updateStatusCompanyApi";
import { useMutation } from "@tanstack/react-query";

export const useStatusCompanyMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["statusCompanyMutation"],
    mutationFn: updateStatusCompanyAPI,
    ...options,
  });

  return mutation;
};
