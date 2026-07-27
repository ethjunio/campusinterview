import { getEducationDetailsApi } from "@/app/services/student/onboardingMgmt/getEducationDetailsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetEducationDataQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getEducationDetails"],
    queryFn: () => getEducationDetailsApi(),
    ...options,
  });
};
