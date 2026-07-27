import { useQuery } from "@tanstack/react-query";
import { getCandidateExperienceApi } from "@/app/services/student/profilemgmt/getCandidateExperienceApi";

export const useGetCandidateExperienceQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getCandidateExperience"],
    queryFn: () => getCandidateExperienceApi(),
    ...options,
  });
};
