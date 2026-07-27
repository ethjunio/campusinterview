import { useQuery } from "@tanstack/react-query";
import { getIndustriesDropdownApi } from "@/app/services/student/companyMgmt/getIndustriesDropdownApi";
export const useGetIndustriesDropdownQuery = (options: any = {}) => {
    return useQuery<{ data: any }>({
      queryKey: ["getIndustriesDropdown"],
      queryFn: () => getIndustriesDropdownApi(),
      ...options,
    });
  };
  