import { useQuery } from "@tanstack/react-query";
import { getReceivedRequestMatchingApi } from "@/app/services/student/matching/getReceivedRequestMatchingApi";
import { getWaitingListMatchingApi } from "@/app/services/student/matching/getWaitingListMatching";

export const useGetWaitingListQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getWaitingListMatching"],
      queryFn: () => getWaitingListMatchingApi(),
      ...options,
    });
  };
  