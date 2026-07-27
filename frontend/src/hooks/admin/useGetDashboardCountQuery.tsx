import { getDashboardCountsAPI } from "@/app/services/admin/getDashboardCountApi";
import { DashboardCounts } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardCountQuery = (options: any = {}) => {
  return useQuery<{ data: DashboardCounts }>({
    queryKey: ["dashboardCounts"],
    queryFn: () => getDashboardCountsAPI(),
    ...options,
  });
};
