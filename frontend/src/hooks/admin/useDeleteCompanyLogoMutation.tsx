import { deleteCompanyLogoApi } from "@/app/services/admin/deleteCompanyLogoApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCompanyLogoMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["useDeleteCompanyLogoMutation"],
    mutationFn: deleteCompanyLogoApi,
    ...options,
  });

  return mutation;
};
