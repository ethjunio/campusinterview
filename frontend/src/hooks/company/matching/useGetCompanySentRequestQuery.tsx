import { useQuery } from "@tanstack/react-query";
import { getCompanySentRequestsApi } from "@/app/services/company/matching/getCompanySentRequestsApi";

export const useGetCompanySentRequestQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getCompanySentRequests"],
      queryFn: () => getCompanySentRequestsApi(),
      ...options,
    });
  };
  