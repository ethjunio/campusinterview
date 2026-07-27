import { getCompanyNamesWithContactAPI } from "@/app/services/admin/getCompanyNamesWithContactApi";
import { Company, CompanyContact, DashboardCounts } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanyNamesWithContactQuery = (
  searchParams: { search: string } = { search: "" },
  options: any = {}
) => {
  return useQuery<{ data: CompanyContact[] }>({
    queryKey: ["companyNamesWithContact", searchParams],
    queryFn: () => getCompanyNamesWithContactAPI(searchParams),
    ...options,
  });
};
