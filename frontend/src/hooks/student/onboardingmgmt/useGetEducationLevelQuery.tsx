import { getEducationLevelsApi } from "@/app/services/student/onboardingMgmt/getEducationLevelsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetEducationLevelQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getEducationLevels"],
    queryFn: () => getEducationLevelsApi(),
    ...options,
  });
};
