import { getCompanyDetailsByIdApi } from "@/app/services/student/companyMgmt/getCompanyDetailsByIdApi";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanyDetailsById = (id: any,options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["CompanyDetailsByIdApi",id],
    queryFn: () => getCompanyDetailsByIdApi(id),
    enabled: !!id,
    ...options,
  });
};
