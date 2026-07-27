import { useQuery } from "@tanstack/react-query";
import { GetCandidateExtracurricularsApi } from "@/app/services/student/profilemgmt/GetCandidateExtracurricularsApi";

export const useGetCandidateExtracurricularsQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["GetCandidateExtracurriculars"],
    queryFn: () => GetCandidateExtracurricularsApi(),
    ...options,
  });
};
