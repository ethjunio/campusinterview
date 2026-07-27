import { useQuery } from "@tanstack/react-query";
import { getCompanyWaitingListApi } from "@/app/services/company/matching/getCompanyWaitingListApi";

export const useGetCompanyWaitingListQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getCompanyWaitingList"],
      queryFn: () => getCompanyWaitingListApi(),
      ...options,
    });
  };
  