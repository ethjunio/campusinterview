import { createApproveCompany } from "@/app/services/admin/createApproveCompany";
import { useMutation } from "@tanstack/react-query";

export const useCreateApproveCompanyMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createApproveCompany"],
    mutationFn: createApproveCompany,
    ...options,
  });

  return mutation;
};
