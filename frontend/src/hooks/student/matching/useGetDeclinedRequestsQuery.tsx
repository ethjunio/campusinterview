import { useQuery } from "@tanstack/react-query";
import { getDeclinedRequestsMatchingApi } from "@/app/services/student/matching/getDeclinedRequestsMatchingApi";

export const useGetDeclinedRequestsQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getDeclinedRequestsMatching"],
      queryFn: () => getDeclinedRequestsMatchingApi(),
      ...options,
    });
  };
  