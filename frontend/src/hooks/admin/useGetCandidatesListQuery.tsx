import { getCandidateListAPI } from "@/app/services/admin/getCandidateListApi";
import { Candidate } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCandidatesListQuery = (options: any = {}) => {
  return useQuery<{ data: Candidate[] }>({
    queryKey: ["candidatesListing"],
    queryFn: () => getCandidateListAPI(),
    ...options,
  });
};
