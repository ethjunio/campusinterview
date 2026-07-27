import { getNationalityDropdownAPI, getResidentialDropdownAPI } from "@/app/services/student/onboardingMgmt/personalFormServices";
import { getUniversityDropdownAPI, getMajorsDropdownAPI, getSpecializationDropdownAPI } from "@/app/services/student/onboardingMgmt/educationalFormServices";
import { getJobDropdownAPI, getWorkDropdownAPI, getActivityDropdownAPI, getInterestDropdownAPI } from "@/app/services/student/onboardingMgmt/candidateJobFormServvices";

  import { useQuery } from "@tanstack/react-query";

  
  export const useGetJobDropdownQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getJobDropdownAPI"],
      queryFn: () => getJobDropdownAPI(),
      ...options,
    });
  };

  export const useGetWorkDropdownQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getWorkDropdownAPI"],
      queryFn: () => getWorkDropdownAPI(),
      ...options,
    });
  };

  export const useGetActivityDropdownQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getActivityDropdownAPI"],
      queryFn: () => getActivityDropdownAPI(),
      ...options,
    });
  };

  export const useGetInterestDropdownQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getInterestDropdownAPI"],
      queryFn: () => getInterestDropdownAPI(),
      ...options,
    });
  };
  