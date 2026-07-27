import { useQuery } from "@tanstack/react-query";
import { getCompanyDeclinedRequestApi } from "@/app/services/company/matching/getCompanyDeclinedRequestApi";

export const useGetCompanyDeclinedRequestquery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getCompanyDeclinedRequest"],
      queryFn: () => getCompanyDeclinedRequestApi(),
      ...options,
    });
  };
  