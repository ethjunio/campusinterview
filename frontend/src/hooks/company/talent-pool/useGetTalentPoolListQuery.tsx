import { useQuery } from "@tanstack/react-query";
import { getTalentPoolListApi } from "@/app/services/company/talent-pool/getTalentPoolListApi";

export const useGetTalentPoolListQuery = (filters: Record<string, any> = {}, pagesize: number, sortName: string) => {
  return useQuery<{ data: any }>({
    queryKey: ["getTalentPoolList", filters, pagesize, sortName],
    queryFn: () => getTalentPoolListApi(filters, pagesize, sortName),
    enabled: !!filters,
    retry: false,
  });
};
