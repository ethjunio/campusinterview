import { useQuery } from "@tanstack/react-query";
import { getSentRequestsMatchingApi } from "@/app/services/student/matching/getSentRequestsMatchingApi";

export const useGetSentRequestQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getSentRequestsMatching"],
      queryFn: () => getSentRequestsMatchingApi(),
      ...options,
    });
  };
  