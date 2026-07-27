import { getNationalityDropdownAPI, getResidentialDropdownAPI } from "@/app/services/student/onboardingMgmt/personalFormServices";
import { useQuery } from "@tanstack/react-query";

export const useGetNationalityDropdownQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getNationalityDropdown"],
    queryFn: () => getNationalityDropdownAPI(),
    ...options,
  });
};

export const useGetResidentialDropdownQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getResidentialDropdown"],
    queryFn: () => getResidentialDropdownAPI(),
    ...options,
  });
};
