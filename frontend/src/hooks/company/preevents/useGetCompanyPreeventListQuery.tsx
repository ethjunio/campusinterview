import { useQuery } from "@tanstack/react-query";
import { getCompanyPreeventListApi } from "@/app/services/company/preevent/getCompanyPreeventListApi";

export const useGetCompanyPreeventListQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getCompanyPreeventList"],
    queryFn: () => getCompanyPreeventListApi(),
    ...options,
  });
};
