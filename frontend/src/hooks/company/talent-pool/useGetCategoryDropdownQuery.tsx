import { useQuery } from "@tanstack/react-query";
import { getCategoryDropdownApi } from "@/app/services/company/talent-pool/getCategoryDropdownApi";

export const useGetCategoryDropdownQuery = (options: any = {}) => {
  return useQuery<{ data: any }>({
    queryKey: ["getCategoryDropdownApi"],
    queryFn: () => getCategoryDropdownApi(),
    ...options,
  });
};
