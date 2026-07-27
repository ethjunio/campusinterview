import { deleteCompaniesApi } from "@/app/services/admin/deleteCompaniesApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCompaniesMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["useDeleteCompaniesMutation"],
    mutationFn: deleteCompaniesApi,
    ...options,
  });

  return mutation;
};
