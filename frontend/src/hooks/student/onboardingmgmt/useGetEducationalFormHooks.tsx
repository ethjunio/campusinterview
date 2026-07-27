import { getNationalityDropdownAPI, getResidentialDropdownAPI } from "@/app/services/student/onboardingMgmt/personalFormServices";
import { getUniversityDropdownAPI, getMajorsDropdownAPI, getSpecializationDropdownAPI } from "@/app/services/student/onboardingMgmt/educationalFormServices";

  import { useQuery } from "@tanstack/react-query";

  
  export const useGetUniversityDropdownQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getUniversityDropdown"],
      queryFn: () => getUniversityDropdownAPI(),
      ...options,
    });
  };

  export const useGetMajorsDropdownQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getMajorsDropdown"],
      queryFn: () => getMajorsDropdownAPI(),
      ...options,
    });
  };

  export const useGetSpecializationDropdownQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getSpecializationDropdown"],
      queryFn: () => getSpecializationDropdownAPI(),
      ...options,
    });
  };
  