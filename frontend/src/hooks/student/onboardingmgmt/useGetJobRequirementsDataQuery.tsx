import { getJobRequirementsApi } from "@/app/services/student/onboardingMgmt/getJobRequirementsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetJobRequirementsDataQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getJobRequirements"],
    queryFn: () => getJobRequirementsApi(),
    ...options,
  });
};
