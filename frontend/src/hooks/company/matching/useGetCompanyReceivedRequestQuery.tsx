import { useQuery } from "@tanstack/react-query";
import { getCompanyReceivedRequestApi } from "@/app/services/company/matching/getCompanyReceivedRequestApi";

export const useGetCompanyReceivedRequestQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getCompanyReceivedRequest"],
      queryFn: () => getCompanyReceivedRequestApi(),
      ...options,
    });
  };
  