import { getCompaniesListAPI } from "@/app/services/admin/getCompaniesListApi";
import { Company, DashboardCounts } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCompaniesListQuery = (options: any = {}) => {
  return useQuery<{ data: Company[] }>({
    queryKey: ["companiesList"],
    queryFn: () => getCompaniesListAPI(),
    ...options,
  });
};
