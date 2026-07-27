import { getCandidateLanguageApi } from "@/app/services/student/profilemgmt/getCandidateLanguageApi";
import { useQuery } from "@tanstack/react-query";

export const useGetCandidateLanguageQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getCandidateLanguage"],
    queryFn: () => getCandidateLanguageApi(),
    ...options,
  });
};
