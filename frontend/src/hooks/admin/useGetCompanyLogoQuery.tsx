import { getCompanyLogosAPI } from "@/app/services/admin/getCompanyLogos";
import { Company, CompanyContact, DashboardCounts } from "@/app/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanyLogoQuery = (type: string, options: any = {}) => {
  return useQuery<{ data: { imageUrl: string }[] }>({
    queryKey: ["companyLogos", type],
    queryFn: () => getCompanyLogosAPI(type),
    ...options,
  });
};
