import { getCandidateSkillsApi } from "@/app/services/student/profilemgmt/getCandidateSkillsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetCandidateSkillsQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getCandidateSkills"],
    queryFn: () => getCandidateSkillsApi(),
    ...options,
  });
};
