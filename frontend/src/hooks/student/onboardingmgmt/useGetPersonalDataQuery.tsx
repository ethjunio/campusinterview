import { getPersonalDetailsApi } from "@/app/services/student/onboardingMgmt/getPersonalDetailsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetPersonalDataQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getPersonalDetails"],
    queryFn: () => getPersonalDetailsApi(),
    ...options,
  });
};
