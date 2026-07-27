import { createAddRemoveCompanyFavouriteApi } from "@/app/services/student/companyMgmt/createAddRemoveCompanyFavouriteApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateAddRemoveCompanyFavoutiteMutation = (options = {}) => {
  const mutation = useMutation({
    mutationKey: ["createAddRemoveCompanyFavourite"],
    mutationFn: createAddRemoveCompanyFavouriteApi,
    ...options,
  });

  return mutation;
};
