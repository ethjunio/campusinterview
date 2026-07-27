import { uploadCompanyLogoAPI } from "@/app/services/admin/uploadCompanyLogoApi";
import { useMutation } from "@tanstack/react-query";

export const useUploadCompanyLogoMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["uploadCompanyLogoMutation"],
    mutationFn: uploadCompanyLogoAPI,
    ...options,
  });

  return mutation;
};
