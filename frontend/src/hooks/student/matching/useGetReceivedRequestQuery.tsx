import { useQuery } from "@tanstack/react-query";
import { getReceivedRequestMatchingApi } from "@/app/services/student/matching/getReceivedRequestMatchingApi";

export const useGetReceivedRequestQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getReceivedRequestMatching"],
      queryFn: () => getReceivedRequestMatchingApi(),
      ...options,
    });
  };
  