import { useQuery } from "@tanstack/react-query";
import { getCompanyListApi } from "@/app/services/student/companyMgmt/getCompanyListApi";

export const useGetCompanyListQuery = (filters: Record<string, any> = {}, pagesize:number, sortOrder:string) => {
  return useQuery<{ data: any }>({
    queryKey: ["getCompanyList", filters, pagesize, sortOrder],
    queryFn: () => getCompanyListApi(filters, pagesize, sortOrder),  
    enabled: !!filters, 
  });
};
